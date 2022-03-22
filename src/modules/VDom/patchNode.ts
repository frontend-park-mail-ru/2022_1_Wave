import VirtualElement from './VirtualElement';

function patchProp(domNode: HTMLElement, propName: string, oldVal: string, newVal: string) {
  if (oldVal !== newVal) {
    if (!newVal) {
      domNode.removeAttribute(propName);
    } else {
      domNode.setAttribute(propName, newVal);
    }
  }
}

function patchProps(domNode: HTMLElement, oldProps: any, newProps: any) {
  const mergedProps = { ...oldProps, ...newProps };

  Object.keys(mergedProps).forEach((prop: string) => {
    patchProp(domNode, prop, oldProps[prop], newProps[prop]);
  });
}

function isAllChildrenWithKey(vnode: VirtualElement) {
  return vnode.children.every((child) => {
    if (child instanceof VirtualElement) {
      return (child as VirtualElement).key != null;
    }
    return false;
  });
}

export default function patch(initial: {
  oldVNode: VirtualElement,
  newVNode: VirtualElement,
  domNode: HTMLElement,
  parentDom: HTMLElement,
  pos: number,
}) {
  const nodesStack = [initial];

  while (nodesStack.length > 0) {
    const {
      oldVNode, newVNode, domNode, parentDom, pos,
    } = nodesStack.pop();

    if (!oldVNode || !domNode) {
      let newElement: Node = null;
      let toPlace: Node;

      if (newVNode instanceof VirtualElement) {
        toPlace = document.createElement(newVNode.type);
      } else {
        toPlace = document.createTextNode(newVNode);
      }

      if (parentDom.childNodes.length > pos) {
        newElement = parentDom.insertBefore(toPlace, parentDom.childNodes[pos]);
      } else {
        newElement = parentDom.appendChild(toPlace);
      }

      nodesStack.push({
        oldVNode: new VirtualElement(newVNode.type, []),
        newVNode,
        domNode: newElement as HTMLElement,
        parentDom,
        pos,
      });
      continue;
    }

    if (typeof newVNode === 'string') {
      if (oldVNode !== newVNode) {
        domNode.replaceWith(document.createTextNode(newVNode));
        continue;
      }
    }

    if (typeof oldVNode === 'string' || oldVNode.type !== newVNode.type) {
      domNode.replaceWith(document.createElement(newVNode.type));
      nodesStack.push({
        oldVNode: new VirtualElement(newVNode.type, [], oldVNode.key),
        newVNode,
        domNode,
        parentDom,
        pos,
      });
      continue;
    }

    patchProps(domNode, oldVNode.props, newVNode.props);

    const toMount = [];
    if (isAllChildrenWithKey(oldVNode) && isAllChildrenWithKey(newVNode)) {
      let oldIdx = 0;

      newVNode.children.forEach((newChild, idx) => {
        const child = domNode.childNodes[oldIdx];
        const oldChild = oldVNode.children[oldIdx];

        if (
          oldChild instanceof VirtualElement
          && newChild instanceof VirtualElement
          && oldChild.key === newChild.key
        ) {
          toMount.push({
            oldVNode: oldChild,
            newVNode: newChild,
            domNode: child as HTMLElement,
            parentDom: domNode,
            pos: idx,
          });
          oldIdx += 1;
        } else {
          toMount.push({
            oldVNode: null,
            newVNode: newChild,
            domNode: null,
            parentDom: domNode,
            pos: idx,
          });
        }
      });
    } else {
      newVNode.children.forEach((newChild, idx) => {
        const child = domNode.childNodes[idx];
        const oldChild = oldVNode.children[idx];

        toMount.push({
          oldVNode: oldChild,
          newVNode: newChild,
          domNode: child as HTMLElement,
          parentDom: domNode,
          pos: idx,
        });
      });
    }
    toMount.forEach((item) => {
      nodesStack.push(item);
    });

    const toUnmount = Array.from<Node>(domNode.childNodes).slice(newVNode.children.length);

    toUnmount.forEach((node) => {
      parentDom.removeChild(node);
    });
  }
}

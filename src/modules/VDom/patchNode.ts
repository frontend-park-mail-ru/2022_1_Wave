import VirtualElement from './VirtualElement';
import Component from './Component';
import { ComponentAttr, VNodeAttr, HandlersAttr } from './Symbols';
import { createHandlersTable, HandlersTable } from './Types';

const EVENT_PREFIX = 'on';
const CAPTURE_SUFFIX = 'capture';

type PatchArg = {
  oldVNode: VirtualElement | string | null,
  newVNode: VirtualElement | string | null,
  domNode: HTMLElement | null,
  parentDom: HTMLElement,
  pos: number,
};

function isAllChildrenWithKey(vnode: VirtualElement): boolean {
  return vnode.children.every((child) => {
    if (child instanceof VirtualElement) {
      return (child as VirtualElement).key != null;
    }
    return false;
  });
}

function initNewElement(newElement: HTMLElement, newVNode: VirtualElement): void {
  newVNode.domNode = newElement;

  if (newVNode.ref) {
    newVNode.ref.instance = newElement;
  }

  if (newVNode.component) {
    (newElement as any)[ComponentAttr] = newVNode.component;
    (newElement as any)[VNodeAttr] = newVNode;
    newVNode.component.node = newElement;
  }

  (newElement as any)[HandlersAttr] = createHandlersTable();
}

function prepareVNodeRemove(oldVNode: VirtualElement | string | null): void {
  const toRemove: VirtualElement[] = [];
  const levels: number[] = [];
  let prevLevel = 0;

  if (oldVNode instanceof VirtualElement) {
    toRemove.push(oldVNode);
    levels.push(0);
  }

  while (toRemove.length > 0) {
    const top: VirtualElement = toRemove[toRemove.length - 1];
    const level: number = levels[levels.length - 1];
    let isLeaf: boolean = true;

    if (prevLevel <= level) {
      for (let idx = top.children.length - 1; idx >= 0; idx -= 1) {
        const child: VirtualElement | string = top.children[idx];

        if (child instanceof VirtualElement) {
          isLeaf = false;
          toRemove.push(child);
          levels.push(level + 1);
        }
      }
    }

    if (prevLevel > level || isLeaf) {
      const current = toRemove.pop()!;
      levels.pop();

      if (current.component) {
        current.component.willUmount();
      }

      current.destruct();
    }

    prevLevel = level;
  }
}

function patchProp(domNode: HTMLElement, propName: string, oldVal: any, newVal: any): void {
  const lowerPropName = propName.toLowerCase();

  if (lowerPropName.startsWith(EVENT_PREFIX)) {
    const descriptorName = lowerPropName.slice(EVENT_PREFIX.length);
    const useCapture = descriptorName.endsWith(CAPTURE_SUFFIX);
    const eventName = useCapture
      ? descriptorName.slice(0, descriptorName.length - CAPTURE_SUFFIX.length)
      : descriptorName;

    if (oldVal !== newVal) {
      const handlers = (domNode as any)[HandlersAttr] as HandlersTable;
      const oldHandler = handlers.get(descriptorName)?.handler;
      if (oldHandler) {
        domNode.removeEventListener(eventName, oldHandler, useCapture);
      }
      handlers.delete(descriptorName);

      if (newVal) {
        handlers.set(descriptorName, {
          eventName,
          handler: newVal as EventListener,
          useCapture,
        });
        domNode.addEventListener(eventName, newVal as EventListener, useCapture);
      }
    }

    return;
  }

  if (propName === 'style') {
    const styleString = Object.entries(newVal)
      .filter(([key]) => key)
      .map(([key, value]) => `${key}: ${value};`)
      .join(' ');

    if (styleString !== domNode.style.cssText) {
      domNode.style.cssText = styleString;
    }

    return;
  }

  if (oldVal !== newVal) {
    if (!newVal) {
      domNode.removeAttribute(propName);
    } else {
      domNode.setAttribute(propName, newVal);
    }
  }
}

function patchProps(domNode: HTMLElement, oldProps: any, newProps: any): void {
  const mergedProps = { ...oldProps, ...newProps };

  Object.keys(mergedProps).forEach((prop: string) => {
    patchProp(domNode, prop, oldProps[prop], newProps[prop]);
  });
}

function patchChildren(
  domNode: HTMLElement,
  oldVNode: VirtualElement,
  newVNode: VirtualElement,
  nodesStack: PatchArg[],
): void {
  const toMount: PatchArg[] = [];
  const toUnmountDom = Array.from<Node>(domNode.childNodes).slice(newVNode.children.length);
  const toUnmountVNode = oldVNode.children.slice(newVNode.children.length);

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

    for (let idx = oldIdx; idx < oldVNode.children.length; idx += 1) {
      toUnmountDom.push(domNode.childNodes[idx]);
      toUnmountVNode.push(oldVNode.children[idx]);
    }
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

  while (toUnmountDom.length > 0) {
    const oldChild = toUnmountVNode.pop()!;
    const oldDom = toUnmountDom.pop()!;
    nodesStack.push({
      oldVNode: oldChild,
      domNode: oldDom as HTMLElement,
      newVNode: null,
      parentDom: domNode,
      pos: 0,
    });
  }

  while (toMount.length > 0) {
    nodesStack.push(toMount.pop()!);
  }
}

function patchAsString(
  domNode: HTMLElement,
  oldVNode: VirtualElement | string,
  newVNode: string,
): void {
  if (oldVNode !== newVNode) {
    prepareVNodeRemove(oldVNode);
    domNode.replaceWith(document.createTextNode(newVNode));
  }
}

function patchAsVNode(
  domNode: HTMLElement,
  parentDom: HTMLElement,
  oldVNode: VirtualElement | string,
  newVNode: VirtualElement,
  pos: number,
  nodesStack: PatchArg[],
): void {
  if (typeof oldVNode === 'string' || oldVNode.type !== newVNode.type) {
    prepareVNodeRemove(oldVNode);

    let key: string | undefined;
    if (oldVNode instanceof VirtualElement) {
      key = oldVNode.key;
    }

    const newElement = document.createElement(newVNode.type as string);

    initNewElement(newElement as HTMLElement, newVNode);

    domNode.replaceWith(newElement);

    nodesStack.push({
      oldVNode: new VirtualElement(newVNode.type, {}, [], key),
      newVNode,
      domNode: newElement as HTMLElement,
      parentDom,
      pos,
    });
  } else {
    if (newVNode.component) {
      (domNode as any)[VNodeAttr] = newVNode;
    }

    patchProps(domNode, oldVNode.props, newVNode.props);

    patchChildren(domNode, oldVNode, newVNode, nodesStack);
  }
}

function patchAsComponent(
  newVNode: VirtualElement,
  oldVNode: VirtualElement | string | null,
  domNode: HTMLElement | null,
  parentDom: HTMLElement,
  pos: number,
  nodesStack: PatchArg[],
  commitChangesStack: Array<() => void>,
): void {
  let component: Component;
  let updatedOldVNode = oldVNode;
  let updatedDomNode = domNode;

  if (oldVNode != null && domNode && (domNode as any)[ComponentAttr]) {
    component = (domNode as any)[ComponentAttr] as Component;

    if (Object.getPrototypeOf(component).constructor === newVNode.type) {
      const prevProps = component.props;
      component.setProps(newVNode.props);
      const snapshot = component.makeSnapshot(prevProps, component.state);
      commitChangesStack.push(() => component.didUpdate(snapshot));
    } else {
      prepareVNodeRemove(oldVNode);
      domNode.remove();
      updatedOldVNode = null;
      updatedDomNode = null;

      component = new (newVNode.type as (new (props: any) => Component))(newVNode.props);
      commitChangesStack.push(() => component.didMount());
    }
  } else {
    component = new (newVNode.type as (new (props: any) => Component))(newVNode.props);
    commitChangesStack.push(() => component.didMount());
  }

  component.children = newVNode.children;
  const rendered = component.render();
  rendered.component = component;

  if (newVNode.parent) {
    newVNode.parent.children[pos] = rendered;
    rendered.parent = newVNode.parent;
  }

  nodesStack.push({
    oldVNode: updatedOldVNode,
    newVNode: rendered,
    domNode: updatedDomNode,
    parentDom,
    pos,
  });
}

function removeFromDom(domNode: HTMLElement, oldVNode: VirtualElement | string | null): void {
  prepareVNodeRemove(oldVNode);
  domNode.remove();
}

function placeIntoDom(
  newVNode: VirtualElement | string,
  parentDom: HTMLElement,
  pos: number,
  nodesStack: PatchArg[],
): void {
  let newElement: Node;
  let toPlace: Node;

  if (newVNode instanceof VirtualElement) {
    toPlace = document.createElement(newVNode.type as string);
  } else {
    toPlace = document.createTextNode(newVNode);
  }

  if (parentDom.childNodes.length <= pos) {
    newElement = parentDom.appendChild(toPlace);
  } else {
    newElement = parentDom.insertBefore(toPlace, parentDom.childNodes[pos]);
  }

  if (newVNode instanceof VirtualElement) {
    initNewElement(newElement as HTMLElement, newVNode);
  }

  nodesStack.push({
    oldVNode: newVNode instanceof VirtualElement
      ? new VirtualElement(newVNode.type, {}, []) : newVNode,
    newVNode,
    domNode: newElement as HTMLElement,
    parentDom,
    pos,
  });
}

export default function patch(initial: PatchArg): void {
  const nodesStack = [initial];
  const commitChangesStack: Array<() => void> = [];

  while (nodesStack.length > 0) {
    const current: PatchArg = nodesStack.pop()!;
    const {
      oldVNode, newVNode, domNode, parentDom, pos,
    }: PatchArg = current;

    // new virtual node does not exist =>
    // we need to remove current node
    // from dom
    if (newVNode == null && oldVNode != null && domNode) {
      removeFromDom(domNode, oldVNode);
    } else if (
      newVNode
      && newVNode instanceof VirtualElement
      && typeof newVNode.type === 'function'
    ) {
      patchAsComponent(newVNode, oldVNode, domNode, parentDom, pos, nodesStack, commitChangesStack);
    // old virtual node and dom node do not exist =>
    // we need to place new node into dom
    } else if (newVNode != null && oldVNode == null && !domNode) {
      placeIntoDom(newVNode, parentDom, pos, nodesStack);
    // invalid case
    } else if (newVNode == null || oldVNode == null || !domNode) {
      console.error('Can\'t patch current:', current);
    } else if (typeof newVNode === 'string') {
      patchAsString(domNode, oldVNode, newVNode);
    } else {
      patchAsVNode(domNode, parentDom, oldVNode, newVNode, pos, nodesStack);
    }
  }

  while (commitChangesStack.length > 0) {
    commitChangesStack.pop()!();
  }

  const { oldVNode, newVNode }: PatchArg = initial;
  if (
    oldVNode
    && oldVNode instanceof VirtualElement
    && oldVNode.parent
    && oldVNode.pos
    && newVNode
  ) {
    oldVNode.parent.children[oldVNode.pos] = newVNode;

    if (newVNode instanceof VirtualElement) {
      newVNode.parent = oldVNode.parent;
      newVNode.pos = oldVNode.pos;

      newVNode.parent.children[newVNode.pos] = newVNode;
    }
  }
}

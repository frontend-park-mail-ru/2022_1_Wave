import VirtualElement from './VirtualElement';
import Component from './Component';
import Fragment from './Fragment';
import { HandlersAttr } from './Symbols';
import { createHandlersTable, HandlersTable } from './Types';
import StringWrapper from './StringWrapper';

const EVENT_PREFIX = 'on';
const CAPTURE_SUFFIX = 'capture';

function isAllChildrenWithKey(vnode: VirtualElement): boolean {
  return vnode.children.every((child) => {
    if (child instanceof VirtualElement) {
      return (child as VirtualElement).key != null;
    }
    return false;
  });
}

function removeVNodeFromDom(oldVNode: VirtualElement | StringWrapper | null): void {
  const toRemove: VirtualElement[] = [];
  const levels: number[] = [];
  let prevLevel = 0;

  if (oldVNode instanceof VirtualElement) {
    toRemove.push(oldVNode);
    levels.push(0);
  } else {
    oldVNode?.domNode!.remove();
  }

  while (toRemove.length > 0) {
    const top: VirtualElement = toRemove[toRemove.length - 1];
    const level: number = levels[levels.length - 1];
    let isLeaf: boolean = true;

    if (prevLevel <= level) {
      for (let idx = top.children.length - 1; idx >= 0; idx -= 1) {
        const child: VirtualElement | StringWrapper = top.children[idx];

        if (child instanceof VirtualElement) {
          isLeaf = false;
          toRemove.push(child);
          levels.push(level + 1);
        } else {
          child.domNode!.remove();
        }
      }
    }

    if (prevLevel > level || isLeaf) {
      const current = toRemove.pop()!;
      levels.pop();

      if (current.component) {
        current.component.willUmount();
        current.component.destruct();
      }

      current.destruct();
      current.domNode?.remove();
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
      // eslint-disable-next-line no-param-reassign
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

function insertAfter(parentDomNode: HTMLElement, newDomNode: Node, leftSibling: Node | null): void {
  if (leftSibling == null) {
    parentDomNode.prepend(newDomNode);
  } else if (leftSibling.nextSibling == null) {
    parentDomNode.append(newDomNode);
  } else {
    parentDomNode.insertBefore(newDomNode, leftSibling.nextSibling);
  }
}

function patchNode(args: {
  parentDomNode: HTMLElement;
  leftSibling: HTMLElement | null;
  oldVNode: VirtualElement | StringWrapper | null;
  newVNode: VirtualElement | StringWrapper | null;
  commitChangesStack: Array<() => void>;
}): HTMLElement | null {
  const { parentDomNode, leftSibling, oldVNode, newVNode, commitChangesStack } = args;

  let realDomNode: HTMLElement | null = null;

  if (newVNode != null) {
    if (newVNode instanceof VirtualElement && typeof newVNode.type === 'function') {
      // Component or Fragment
      if (newVNode.type === Fragment) {
        // Fragment
        let oldChildren: Array<VirtualElement | StringWrapper> = [];
        let currentLeftSibling = leftSibling;

        if (!(oldVNode instanceof VirtualElement) || oldVNode.type !== Fragment) {
          removeVNodeFromDom(oldVNode);
        } else {
          oldChildren = oldVNode.children;
        }

        oldChildren.forEach((oldChild, idx) => {
          currentLeftSibling = patchNode({
            parentDomNode,
            leftSibling: currentLeftSibling,
            oldVNode: oldChild,
            newVNode: newVNode.children[idx] ?? null,
            commitChangesStack,
          });
        });
        newVNode.children.slice(oldChildren.length).forEach((newChild) => {
          currentLeftSibling = patchNode({
            parentDomNode,
            leftSibling: currentLeftSibling,
            oldVNode: null,
            newVNode: newChild,
            commitChangesStack,
          });
        });

        realDomNode = currentLeftSibling;
      } else {
        // Component
        let component: Component;
        let nextOldVNode: VirtualElement | StringWrapper | null = oldVNode;
        let componentAlreadyExists = false;

        if (oldVNode instanceof VirtualElement && oldVNode.component != null) {
          component = oldVNode.component;

          if (Object.getPrototypeOf(component).constructor === newVNode.type) {
            componentAlreadyExists = true;

            const prevProps = component.props;
            component.setProps({
              ...newVNode.props,
              ref: newVNode.ref,
              parentDomNode,
              leftSibling,
              vNode: newVNode,
              children: newVNode.children,
            });
            const snapshot = component.makeSnapshot(prevProps, component.state);

            commitChangesStack.push(() => component.didUpdate(snapshot));
          } else {
            removeVNodeFromDom(oldVNode);
            nextOldVNode = null;
          }
        }

        if (!componentAlreadyExists) {
          component = new (newVNode.type as new (props: any) => Component)({
            ...newVNode.props,
            ref: newVNode.ref,
            parentDomNode,
            leftSibling,
            vNode: newVNode,
            children: newVNode.children,
          });
          commitChangesStack.push((): void => component.didMount());
        }

        component!.children = newVNode.children;
        const rendered = component!.renderAndCopy();
        const renderedWrapper = new VirtualElement(Fragment, {}, [rendered]);
        renderedWrapper.component = component!;
        renderedWrapper.parent = newVNode.parent;
        renderedWrapper.pos = newVNode.pos;
        component!.props.vNode = renderedWrapper;

        if (renderedWrapper.parent != null && renderedWrapper.pos !== null) {
          renderedWrapper.parent.children[renderedWrapper.pos] = renderedWrapper;
        }

        realDomNode = patchNode({
          parentDomNode,
          leftSibling,
          newVNode: renderedWrapper,
          oldVNode: nextOldVNode,
          commitChangesStack,
        });
      }
    } else if (oldVNode == null) {
      // Create
      // newVNode is not component
      let nextParentDomNode = parentDomNode;
      let newDomNode: Node;

      if (newVNode instanceof StringWrapper) {
        newDomNode = document.createTextNode(newVNode.data);
        (newVNode as any).domNode = newDomNode;
      } else {
        newDomNode = document.createElement(newVNode.type as string);
        newVNode.domNode = newDomNode as HTMLElement;
        (newDomNode as any)[HandlersAttr] = createHandlersTable();

        if (newVNode.ref != null) {
          newVNode.ref.instance = newVNode.domNode;
        }

        patchProps(newVNode.domNode, {}, newVNode.props);

        nextParentDomNode = newDomNode as HTMLElement;
      }

      insertAfter(parentDomNode, newDomNode, leftSibling);
      realDomNode = newDomNode as unknown as HTMLElement;

      // create children
      if (newVNode instanceof VirtualElement) {
        // update parentDomNode
        let newLeftSibling: HTMLElement | null = null;
        newVNode.children.forEach((childVNode): void => {
          newLeftSibling = patchNode({
            parentDomNode: nextParentDomNode,
            leftSibling: newLeftSibling,
            newVNode: childVNode,
            oldVNode: null,
            commitChangesStack,
          });
        });
      }
    } else {
      // Compare old and new
      // both are regular node or text node
      if (newVNode instanceof StringWrapper) {
        // Text node
        if (!(oldVNode instanceof StringWrapper) || oldVNode.data !== newVNode.data) {
          // replace old with new
          removeVNodeFromDom(oldVNode);
          realDomNode = patchNode({
            parentDomNode,
            leftSibling,
            oldVNode: null,
            newVNode,
            commitChangesStack,
          });
          newVNode.domNode = realDomNode as unknown as Text;
        } else {
          // Equal
          newVNode.domNode = oldVNode.domNode as Text;
          realDomNode = newVNode.domNode as unknown as HTMLElement;
        }
      } else {
        // Regular node
        if (oldVNode instanceof StringWrapper || oldVNode.type !== newVNode.type) {
          // replace old with new
          removeVNodeFromDom(oldVNode);
          realDomNode = patchNode({
            parentDomNode,
            leftSibling,
            oldVNode: null,
            newVNode,
            commitChangesStack,
          });
        } else {
          realDomNode = oldVNode.domNode;
          newVNode.domNode = realDomNode;

          if (newVNode.ref != null) {
            newVNode.ref.instance = realDomNode;
          }

          patchProps(realDomNode!, oldVNode.props, newVNode.props);

          // Patch children
          let nextLeftSibling: HTMLElement | null = null;

          if (isAllChildrenWithKey(oldVNode) && isAllChildrenWithKey(newVNode)) {
            let oldChildIdx = 0;

            newVNode.children.forEach((newChild) => {
              const oldChild = oldVNode.children[oldChildIdx] ?? null;

              if (
                oldChild instanceof VirtualElement &&
                newChild instanceof VirtualElement &&
                newChild.key === oldChild.key
              ) {
                nextLeftSibling = patchNode({
                  parentDomNode: newVNode.domNode!,
                  leftSibling: nextLeftSibling,
                  oldVNode: oldChild,
                  newVNode: newChild,
                  commitChangesStack,
                });

                oldChildIdx += 1;
              } else {
                nextLeftSibling = patchNode({
                  parentDomNode: newVNode.domNode!,
                  leftSibling: nextLeftSibling,
                  oldVNode: null,
                  newVNode: newChild,
                  commitChangesStack,
                });
              }
            });
            oldVNode.children.slice(oldChildIdx).forEach((oldChild) => {
              patchNode({
                parentDomNode: newVNode.domNode!,
                leftSibling: nextLeftSibling,
                oldVNode: oldChild,
                newVNode: null,
                commitChangesStack,
              });
            });
          } else {
            oldVNode.children.forEach((oldChild, idx) => {
              nextLeftSibling = patchNode({
                parentDomNode: newVNode.domNode!,
                leftSibling: nextLeftSibling,
                oldVNode: oldChild,
                newVNode: newVNode.children[idx] ?? null,
                commitChangesStack,
              });
            });
            newVNode.children.slice(oldVNode.children.length).forEach((newChild) => {
              nextLeftSibling = patchNode({
                parentDomNode: newVNode.domNode!,
                leftSibling: nextLeftSibling,
                oldVNode: null,
                newVNode: newChild,
                commitChangesStack,
              });
            });
          }
        }
      }
    }
  } else {
    if (oldVNode == null) {
      throw Error('Can not patch Virtual Dom: new node and old node are both null');
    }

    // Delete
    removeVNodeFromDom(oldVNode);
  }

  return realDomNode;
}

export default function patch(args: {
  parentDomNode: HTMLElement;
  leftSibling: HTMLElement | null;
  oldVNode: VirtualElement | StringWrapper | null;
  newVNode: VirtualElement | StringWrapper | null;
}): void {
  const commitChangesStack: Array<() => void> = [];

  patchNode({ ...args, commitChangesStack });

  while (commitChangesStack.length > 0) {
    commitChangesStack.pop()!();
  }
}

// export default function patch(initial: PatchArg): void {
//   const nodesStack = [initial];
//   const commitChangesStack: Array<() => void> = [];
//
//   while (nodesStack.length > 0) {
//     const current: PatchArg = nodesStack.pop()!;
//     const {
//       oldVNode, newVNode, domNode, parentDom, pos, ctxNode,
//     }: PatchArg = current;
//
//     // new virtual node does not exist =>
//     // we need to remove current node
//     // from dom
//     if (newVNode == null && oldVNode != null && domNode) {
//       removeFromDom(domNode, oldVNode);
//     } else if (
//       newVNode
//       && newVNode instanceof VirtualElement
//       && typeof newVNode.type === 'function'
//     ) {
//       patchAsComponent(
//         newVNode,
//         oldVNode,
//         domNode,
//         parentDom,
//         pos,
//         nodesStack,
//         commitChangesStack,
//         ctxNode,
//       );
//     // old virtual node and dom node do not exist =>
//     // we need to place new node into dom
//     } else if (newVNode != null && oldVNode == null && !domNode) {
//       placeIntoDom(newVNode, parentDom, pos, nodesStack, ctxNode);
//     // invalid case
//     } else if (newVNode == null || oldVNode == null || !domNode) {
//       console.error('Can\'t patch current:', current);
//     } else if (typeof newVNode === 'string') {
//       patchAsString(domNode, oldVNode, newVNode);
//     } else {
//       patchAsVNode(domNode, parentDom, oldVNode, newVNode, pos, nodesStack, ctxNode);
//     }
//   }
//
//   while (commitChangesStack.length > 0) {
//     commitChangesStack.pop()!();
//   }
//
//   const { oldVNode, newVNode }: PatchArg = initial;
//   if (
//     oldVNode
//     && oldVNode instanceof VirtualElement
//     && oldVNode.parent
//     && oldVNode.pos
//     && newVNode
//   ) {
//     oldVNode.parent.children[oldVNode.pos] = newVNode;
//
//     if (newVNode instanceof VirtualElement) {
//       newVNode.parent = oldVNode.parent;
//       newVNode.pos = oldVNode.pos;
//
//       newVNode.parent.children[newVNode.pos] = newVNode;
//     }
//   }
// }

import VirtualElement from './VirtualElement';
import StringWrapper from './StringWrapper';

export default function cloneVNode(vNode: VirtualElement): VirtualElement {
  return new VirtualElement(
    vNode.type,
    vNode.props,
    vNode.children.map((child) => {
      if (child instanceof StringWrapper) {
        return new StringWrapper(child.data);
      }

      return cloneVNode(child);
    }),
    vNode.key,
    vNode.ref,
  );
}

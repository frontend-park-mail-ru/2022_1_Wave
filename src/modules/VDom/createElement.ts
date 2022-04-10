import VirtualElement from './VirtualElement';
import Ref from './Ref';
import StringWrapper from './StringWrapper';

export default function createElement(
  type: string | Function,
  props: any = {},
  ...children: Array<any>
): VirtualElement {
  const { key, ref, ...restProps } = (props ?? {}) as unknown as { key?: string, ref?: Ref };
  const vChildren: Array<VirtualElement | StringWrapper> = children.flat().map((child) => {
    if (child instanceof VirtualElement) {
      return child;
    }

    return new StringWrapper(child.toString());
  });
  return new VirtualElement(type, restProps, vChildren, key, ref);
}

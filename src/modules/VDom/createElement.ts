import VirtualElement from './VirtualElement';
import Ref from './Ref';

export default function createElement(
  type: string | Function,
  props: any = {},
  ...children: Array<VirtualElement | string>
): VirtualElement {
  const { key, ref, ...restProps } = (props ?? {}) as unknown as { key?: string, ref?: Ref };
  return new VirtualElement(type, restProps, children.flat(), key, ref);
}

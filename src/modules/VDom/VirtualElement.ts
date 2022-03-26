import Component from './Component';
import Ref from './Ref';

export default class VirtualElement {
  public readonly type: string | Function;

  public readonly props: any;

  public readonly key: string | undefined;

  public children: Array<VirtualElement | string>;

  public component: Component | null;

  public parent: VirtualElement | null;

  public pos: number | null;

  public ref: Ref | undefined;

  constructor(
    type: string | Function,
    props: any,
    children: Array<VirtualElement | string>,
    key?: string,
    ref?: Ref,
  ) {
    this.type = type;
    this.props = props;
    this.key = key;
    this.children = [...children];
    this.component = null;
    this.parent = null;
    this.pos = null;
    this.ref = ref;

    this.children.forEach((child, idx) => {
      if (child instanceof VirtualElement) {
        child.parent = this;
        child.pos = idx;
      }
    });
  }

  destruct(): void {
  }
}

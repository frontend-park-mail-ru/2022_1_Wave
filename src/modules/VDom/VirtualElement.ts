import Component from './Component';

export default class VirtualElement {
  public readonly type: string | Function;

  public readonly props: any;

  public readonly key: string | undefined;

  public children: Array<VirtualElement | string>;

  public component: Component | null;

  public parent: VirtualElement | null;

  constructor(
    type: string | Function,
    props: any,
    children: Array<VirtualElement | string>,
    key?: string,
  ) {
    this.type = type;
    this.props = props;
    this.key = key;
    this.children = [...children];
    this.component = null;
    this.parent = null;

    this.children.forEach((child) => {
      if (child instanceof VirtualElement) {
        child.parent = this;
      }
    });
  }

  destruct(): void {
  }
}

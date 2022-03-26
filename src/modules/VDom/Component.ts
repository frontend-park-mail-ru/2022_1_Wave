import VirtualElement from './VirtualElement';
import Ref from './Ref';
import patch from './patchNode';
import { VNodeAttr } from './Symbols';

export default abstract class Component<Props = any, State = any, Snapshot = any> {
  public props: Props;

  public node: HTMLElement | null;

  public state: State;

  public children: Array<VirtualElement | string>;

  constructor(props: Props) {
    this.node = null;
    this.children = [];
    this.setProps(props);
  }

  setProps(props: Props): void {
    const { ref, ...rest } = props as unknown as { ref?: Ref };
    if (ref) {
      ref.instance = this;
    }

    this.props = rest as Props;
  }

  abstract render(): VirtualElement;

  didMount(): void {}

  didUpdate(snapshot: Snapshot | null): void {}

  willUmount(): void {}

  makeSnapshot(prevProps: Props, prevState: State): Snapshot | null { return null; }

  setState(partialState: any): void {
    const prevState = this.state;
    this.state = { ...this.state, ...partialState };
    this.update(prevState);
  }

  update(prevState: State): void {
    const snapshot = this.makeSnapshot(this.props, prevState);

    const newVNode = this.render();
    const domNode = this.node!;
    const oldVNode = (this.node as any)?.[VNodeAttr] as VirtualElement;
    const parentDom = domNode.parentElement!;
    const pos = oldVNode!.pos!;

    patch({
      newVNode,
      oldVNode,
      domNode,
      parentDom,
      pos,
    });

    this.didUpdate(snapshot);
  }
}

import VirtualElement from './VirtualElement';
import Ref from './Ref';
import patch from './patchNode';
import { VNodeAttr } from './Symbols';
import { Context, ContextNode, ContextType, IContext, IContextType } from './Context';

export default abstract class Component<Props = any, State = any, Snapshot = any, ContextValueType = null> {
  public props: Props;

  public node: HTMLElement | null;

  public state: State;

  public children: Array<VirtualElement | string>;

  public ctxNode: ContextNode | null;

  public ctx: Context<ContextValueType>;

  #destructListeners: Array<() => void>;

  constructor(props: Props) {
    this.node = null;
    this.children = [];
    this.setProps(props);
    this.ctxNode = null;
    this.#destructListeners = [];
  }

  setContext(ctx: IContext | null): void {
    if (ctx) {
      this.ctx = ctx as Context<ContextValueType>;
    } else {
      this.ctx = new Context<ContextValueType>(this.contextType! as ContextType<ContextValueType>);
    }

    this.#destructListeners.push(
      this.ctx.subscribe(() => this.setState(this.state)),
    );
  }

  produceContext(): IContext | null {
    return null;
  }

  get contextType(): IContextType | null {
    return null;
  }

  destruct(): void {
    this.#destructListeners.forEach((listener) => listener());
    this.#destructListeners.length = 0;
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
    const ctxNode = this.ctxNode;

    newVNode.component = this;

    patch({
      newVNode,
      oldVNode,
      domNode,
      parentDom,
      pos,
      ctxNode,
    });

    this.didUpdate(snapshot);
  }
}

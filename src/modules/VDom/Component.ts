import VirtualElement from './VirtualElement';
import Ref from './Ref';
import patch from './patchNode';
import { VNodeAttr } from './Symbols';
import { createContext, ContextType } from './Context';
import StringWrapper from './StringWrapper';
import { Debounce } from './util';
import Fragment from './Fragment';
import type { IComponentProps } from './IComponentProps';
import cloneVNode from './cloneVNode';

interface IComponentPropsIternal {
  parentDomNode: HTMLElement;
  leftSibling: HTMLElement;
  vNode: VirtualElement;
}

export default abstract class Component<Props = any, State = any, Snapshot = any, ContextValueType = null> {
  public props: Props & IComponentProps & IComponentPropsIternal;

  public node: HTMLElement | null;

  public state: State;

  public children: Array<VirtualElement | StringWrapper>;

  public context: ContextValueType;

  #destructListeners: Array<() => void>;

  constructor(props: Props) {
    this.node = null;
    this.children = [];
    this.setProps(props);
    this.#destructListeners = [];
  }

  destruct(): void {
    this.#destructListeners.forEach((listener) => listener());
    this.#destructListeners.length = 0;
  }

  setProps(props: Props): void {
    const { ref } = props;
    if (ref) {
      ref.instance = this as unknown as Component;
    }

    const context = Object
      .getPrototypeOf(this)
      .constructor
      .contextType as ContextType<ContextValueType>;
    let curVNode: VirtualElement | null = props.vNode;

    if (context != null) {
      // console.log("!!!!!!!!!!!!!!!!!!!");
      while (curVNode) {
        // console.log(curVNode);
        if (curVNode.component != null) {
          if (Object.getPrototypeOf(curVNode.component).constructor === context.Provider) {
            // console.log("????");
            this.context = (curVNode.component as any).props.value as ContextValueType;
            break;
          }
        }

        curVNode = curVNode.parent;
      }

      if (curVNode == null) {
        this.context = context.defaultValue;
      }
    }

    this.props = props;
  }

  abstract render(): VirtualElement;

  renderAndCopy(): VirtualElement {
    return cloneVNode(this.render());
  }

  didMount(): void {}

  // eslint-disable-next-line no-unused-vars
  didUpdate(snapshot: Snapshot | null): void {}

  willUmount(): void {}

  // eslint-disable-next-line no-unused-vars
  makeSnapshot(prevProps: Props, prevState: State): Snapshot | null { return null; }

  setState(partialState: any): void {
    const prevState = this.state;
    this.state = { ...this.state, ...partialState };
    this.enqueueUpdate(this.props, prevState);
  }

  @Debounce(10)
  enqueueUpdate(prevProps?: Props, prevState?: State): void {
    let { props } = this;
    let { state } = this;

    if (prevProps != null) {
      props = prevProps;
    }
    if (prevState != null) {
      state = prevState;
    }

    const snapshot = this.makeSnapshot(props, state);

    const rendered = this.renderAndCopy();
    const oldVNode = this.props.vNode.children[0];
    const { parentDomNode, leftSibling } = this.props;

    rendered.parent = this.props.vNode;
    rendered.pos = 0;
    this.props.vNode.children[0] = rendered;

    patch({
      parentDomNode,
      leftSibling,
      newVNode: rendered,
      oldVNode,
    });


    // this.props.vNode.children[0] = rendered;
    this.didUpdate(snapshot);
  }
  //
  // update(prevState: State): void {
  //   const snapshot = this.makeSnapshot(this.props, prevState);
  //
  //   const newVNode = this.render();
  //   const domNode = this.node!;
  //   const oldVNode = (this.node as any)?.[VNodeAttr] as VirtualElement;
  //   const parentDom = domNode.parentElement!;
  //   const pos = oldVNode!.pos!;
  //   const ctxNode = this.ctxNode;
  //
  //   newVNode.component = this;
  //
  //   patch({
  //     newVNode,
  //     oldVNode,
  //     domNode,
  //     parentDom,
  //     pos,
  //     ctxNode,
  //   });
  //
  //   this.didUpdate(snapshot);
  // }
}

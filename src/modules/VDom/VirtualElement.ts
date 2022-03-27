import Component from './Component';
import Ref from './Ref';
import { HandlersAttr } from './Symbols';
import { HandlersTable, HandlerDescriptor } from './Types';

export default class VirtualElement {
  public readonly type: string | Function;

  public readonly props: any;

  public readonly key: string | undefined;

  public children: Array<VirtualElement | string>;

  public component: Component | null;

  public parent: VirtualElement | null;

  public pos: number | null;

  public ref: Ref | undefined;

  public domNode: HTMLElement | null;

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
    this.domNode = null;

    this.children.forEach((child, idx) => {
      if (child instanceof VirtualElement) {
        child.parent = this;
        child.pos = idx;
      }
    });
  }

  destruct(): void {
    const handlers = (this.domNode as any)?.[HandlersAttr] as HandlersTable | null;

    handlers?.forEach((descriptor) => {
      const { eventName, handler, useCapture }: HandlerDescriptor = descriptor;
      this.domNode?.removeEventListener(eventName, handler, useCapture);
    });
  }
}

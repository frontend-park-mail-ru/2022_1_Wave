export interface IContextNode {
  next: IContextNode | null;
  readonly type: any;
}

export interface IContext<T> {
  value: T;
}

export type ContextListener = () => void;
export type ContextUnlistener = () => void;

export default class Context<T> implements IContextNode, IContext<T> {
  value: T;

  next: IContextNode | null;

  #listeners: ContextListener[];

  // @ts-ignore
  readonly type = T;

  constructor(parent: IContextNode, value: T) {
    this.value = value;
    this.next = parent;
    this.#listeners = [];
  }

  subscribe(listener: ContextListener): ContextUnlistener {
    this.#listeners.push(listener);

    return () => {
      const idx = this.#listeners.indexOf(listener);
      if (idx > 0) {
        this.#listeners.splice(idx, 1);
      }
    };
  }
}

export function fromContextList<T>(ctx: IContextNode | null): IContext<T> | null {
  let cur = ctx;

  while (cur != null) {
    // @ts-ignore
    if (cur.type === T) {
      return cur as Context<T>;
    }

    cur = cur.next;
  }

  return null;
}

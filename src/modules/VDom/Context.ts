export interface IContextType {
  contextId: Symbol;
}

export class ContextType<T> implements IContextType{
  contextId: Symbol;

  defaultValue: T;

  constructor(name: string, defaultValue: T) {
    this.contextId = Symbol(name);
    this.defaultValue = defaultValue;
  }
}

export type Listener = () => void;
export type Unsubscriber = () => void;

export interface IContext {
  type: IContextType;
  subscribe(listener: Listener): Unsubscriber;
}

export class Context<T> implements IContext {
  #type: ContextType<T>;

  get type(): IContextType {
    return this.#type;
  }

  #value: T;

  get value(): T {
    return this.#value;
  }

  set value(val: T) {
    this.#value = val;
    this.#listeners.forEach((listener) => listener());
  }

  #listeners: Set<Listener>;

  constructor(type: ContextType<T>, value?: T) {
    this.#type = type;
    this.#listeners = new Set<Listener>();

    if (value !== undefined) {
      this.#value = value;
    } else {
      this.#value = type.defaultValue;
    }
  }

  subscribe(listener: Listener): Unsubscriber {
    this.#listeners.add(listener);
    return () => this.#listeners.delete(listener);
  }
}

export type ContextNode = {
  context: IContext,
  next: ContextNode,
}

export function fromContextList<T>(node: ContextNode | null, contextType: IContextType): Context<T> | null {
  let cur = node;

  while (cur !== null) {
    if (cur.context.type.contextId === contextType.contextId) {
      return cur.context as Context<T>;
    }

    cur = cur.next;
  }

  return null;
}

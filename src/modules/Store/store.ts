import { IStore, Map } from './types';

// eslint-disable-next-line no-unused-vars
export type MiddlewareFactory = (store: IStore) => (dispatch: Function) => () => void;
// eslint-disable-next-line no-unused-vars
export type Reducer = (state: Map, action: Function) => Map;

export class Store {
  #state: Map;

  #middlewareFactories: MiddlewareFactory[];

  #reducer: Reducer;

  #listeners: Function[];

  constructor(
    reducer: Reducer = (state): Map => state,
    middlewareFactories: MiddlewareFactory[] = [],
    initialState: any = {},
  ) {
    this.#state = initialState;
    this.dispatch = this.dispatch.bind(this);
    for (let i = 0; i < middlewareFactories.length; i += 1) {
      const factory = middlewareFactories[i];
      this.dispatch = factory(this)(this.dispatch);
    }
    this.#listeners = [];
    this.#reducer = reducer;
    this.subscribe = this.subscribe.bind(this);
  }

  getState(): Map {
    return this.#state;
  }

  subscribe(listener: (key: any) => void): () => void {
    this.#listeners.push(listener);

    return () => {
      const removeIdx = this.#listeners.indexOf(listener);
      if (removeIdx >= 0) {
        this.#listeners.splice(removeIdx, 1);
      }
    };
  }

  dispatch(action: Function): void {
    this.#state = this.#reducer(this.#state, action);
    this.#listeners.forEach((listener) => {
      listener(this.#state);
    });
  }
}

export const createStore = (
  reducer: Reducer,
  initialSate: any,
  middlewares: MiddlewareFactory[],
): Store => {
  return new Store(reducer, middlewares, initialSate);
};

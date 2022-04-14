import { IStore, Map } from './types';
import { createLoggerMiddleware, createThunkMiddleware } from './middleware';
import rootReducer from '../../reducers';

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
    console.log('Middleware', middlewareFactories);
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

  subscribe(listener: (key: any) => void): void {
    this.#listeners.push(listener);
  }

  dispatch(action: Function): void {
    this.#state = this.#reducer(this.#state, action);
    this.#listeners.forEach((listener) => {
      listener(this.#state);
    });
  }
}

export const createStore = (): Store => {
  const middleWares: MiddlewareFactory[] = [createLoggerMiddleware, createThunkMiddleware];
  const initStore: Store = new Store(rootReducer, middleWares, {});
  return initStore;
};

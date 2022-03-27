export type Store = {
    state: object,
    listeners: object[],
    getState: () => void,
    subscribe: Function,
    dispatch: Function,

}

type MiddlewareFactory = (store: Store) => (dispatch: Function) => Function
function decorateDispatch(store: Store, middlewareFactories: MiddlewareFactory[]):Function {
  let { dispatch } = store;
  middlewareFactories.forEach((factory) => {
    dispatch = factory(store)(dispatch);
  });
  return dispatch;
}

export type Reducer = (state:object,action:Function) => Function;
export const createStore = (
  reducer: Reducer,
  middlewareFactories: MiddlewareFactory[] = [],
  initialState:any = {},
): Store => {
  const store: Store = {
    state: initialState,
    listeners: [],
    getState: () => store.state,
    subscribe: (listener: ()=> void) => {
      store.listeners
        .push(listener);
    },
    dispatch: (action) => {
      store.state = reducer(store.state, action);
      store.listeners
        .forEach((listener: ()=> void) => {
          listener();
        });
    },
  };
  store.dispatch = decorateDispatch(store, middlewareFactories);
  return store;
};

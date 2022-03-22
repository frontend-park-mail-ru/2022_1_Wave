export type Store = {
    state: object,
    listeners: object[],
    getState: () => void,
    subscribe: (listener: object) => void,
    dispatch: (action: object) => void,

}

function decorateDispatch(store, middlewareFactories) {
  let dispatch = store.dispatch;
  middlewareFactories.forEach(factory => {
    dispatch = factory(store)(dispatch);
  });
  return dispatch;
}

export const createStore = (reducer, middlewareFactories = [], initialState = {}): Store => {
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
          listener()
        });
    },
  };
  store.dispatch = decorateDispatch(store, middlewareFactories);
  return store;
}

import { createStore } from '../Store/store';
import { createLoggerMiddleware, createThunkMiddleware } from '../Store/middleware';

const combineReducers = (reducers: Function[]) :object => (state: object, action: Function) => {
  Object.entries(reducers)
    .map(([name, reducer]): void => {
      if (!state[name]) {
        state[name] = {};
      }
      reducer(state[name], action);
    });
  return state;
};

const reducer1 = (state: object, action): object => {
  if (!state.num) {
    state.num = 0;
  }
  switch (action.type) {
  case 'Inc':
    state.num++;
    break;
  case 'Dec':
    state.num--;
    break;
  }
  return state;
};

const reducer2 = (state, action): object => {
  if (!state.num) {
    state.num = 0;
  }
  switch (action.type) {
  case 'In':
    state.num++;
    break;
  case 'De':
    state.num--;
    break;
  }
  return state;
};

const rootReducer = combineReducers({ reducer1, reducer2 });
const middleWares = [createLoggerMiddleware, createThunkMiddleware];
export const store = createStore(rootReducer, middleWares, {});

import { Reducer } from '../Store/store';
import { Map } from '../Store/types';

// eslint-disable-next-line max-len
const combineReducers =
  (reducers: Map): Reducer =>
  (state: Map, action: Function): Map => {
    Object.entries(reducers).map(([name, reducer]): Map => {
      state[name] = reducer(state[name], action);
    });
    return state;
  };

export default combineReducers;

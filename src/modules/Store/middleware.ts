// eslint-disable-next-line max-len
import { MiddlewareFactory } from './store';
import { IStore } from './types';

// eslint-disable-next-line max-len
export const createLoggerMiddleware: MiddlewareFactory =
  (store: IStore) => (dispatch: Function) => (action: Function) => {
    console.log('action', action);
    dispatch(action);
    console.log('state', store.getState());
  };

// eslint-disable-next-line max-len
export const createThunkMiddleware: MiddlewareFactory =
  (store: IStore) => (dispatch: Function) => (action: Function) => {
    if (typeof action === 'function') {
      return action(dispatch, store.getState());
    }
    return dispatch(action);
  };

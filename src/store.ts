import { createLoggerMiddleware, createThunkMiddleware } from './modules/Store/middleware';
import rootReducer from './reducers';
import { createStore, Store } from './modules/Store/store';

const initialState: any = {
  userStatus: 'pending',
};

export default function configureStore(): Store {
  return createStore(rootReducer, initialState, [createLoggerMiddleware, createThunkMiddleware]);
}

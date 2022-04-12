import { Map } from '../modules/Store/types';

export const Auth = (state: Map, action: Map): Map => {
  if (action.type === 'logout/user' || 'signup/user') {
    state.user = action.payload;
  }
  return state;
};

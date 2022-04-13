import { Map } from '../modules/Store/types';

export default (state: Map, action: Map): Map | null => {
  switch (action.type) {
    case 'logout/user':
      return null;
    case 'self/user':
    case 'login/user':
    case 'signup/user':
      return action.payload;
    default:
      return state;
  }
};

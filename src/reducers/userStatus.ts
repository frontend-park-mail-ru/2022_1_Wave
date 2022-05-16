import { Map } from '../modules/Store/types';

type UserStatus = 'pending' | 'unauthorized' | 'authorized';

export default (state: UserStatus, action: Map): UserStatus => {
  switch (action.type) {
  case 'logout/user':
    return 'unauthorized';
  case 'self/user':
    if (!action.payload) {
      return 'unauthorized';
    }
    return 'authorized'
  case 'login/user':
  case 'signup/user':
    return 'authorized'
  case 'set/user':
  default:
    return state;
  }
};

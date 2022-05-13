import { Map } from '../modules/Store/types';

export const authRequired = (state: boolean, action: Map): boolean => {
  switch (action.type) {
  case 'authRequired/open':
    return true;
  case 'authRequired/close':
    return false;
  default:
    return state;
  }
};

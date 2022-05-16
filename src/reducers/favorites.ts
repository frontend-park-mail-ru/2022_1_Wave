import { Map } from '../modules/Store/types';

export default (state: Map, action: Map): Map => {
  switch (action.type) {
  case 'favorites/get':
    return action.payload;
  case 'logout/user':
    return action.payload;
  default:
    return state;
  }
};

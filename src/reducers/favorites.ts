import { Map } from '../modules/Store/types';

export const favorites = (state: Map, action: Map): Map => {
  switch (action.type) {
  case 'favorites/get':
    return action.payload;
  case 'logout/user':
    return action.payload;
  default:
    return state;
  }
};

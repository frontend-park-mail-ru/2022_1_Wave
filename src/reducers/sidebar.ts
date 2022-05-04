import { Map } from '../modules/Store/types';

export default (state: Map, action: Map): Map | null => {
  switch (action.type) {
  case 'sidebar/open':
  case 'sidebar/close':
    return action.payload;
  default:
    return state;
  }
};
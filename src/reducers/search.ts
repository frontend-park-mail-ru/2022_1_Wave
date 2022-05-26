import { Map } from '../modules/Store/types';

export default (state: Map, action: Map): Map | null => {
  switch (action.type) {
  case 'search/request':
  case 'search/clear':
    return action.payload;
  default:
    return state;
  }
};

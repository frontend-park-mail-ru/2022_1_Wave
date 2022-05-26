import { Map } from '../modules/Store/types';

export default (state: Map, action: Map): Map => {
  switch (action.type) {
  case 'sidePlaylist/get':
    return action.payload;
  default:
    return state;
  }
};

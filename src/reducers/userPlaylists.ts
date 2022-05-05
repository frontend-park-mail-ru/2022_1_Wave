import { Map } from '../modules/Store/types';

export const userPlaylists = (state: Map, action: Map): Map => {
  switch (action.type) {
  case 'userPlaylist/get':
    return action.payload;
  default:
    return state;
  }
};

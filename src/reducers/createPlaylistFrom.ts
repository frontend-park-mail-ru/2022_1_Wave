import { Map } from '../modules/Store/types';

const createPlaylistForm = (state: boolean, action: Map): boolean => {
  switch (action.type) {
  case 'createPlaylistForm/open':
    return true;
  case 'createPlaylistForm/close':
    return false;
  default:
    return state;
  }
};

export default createPlaylistForm;

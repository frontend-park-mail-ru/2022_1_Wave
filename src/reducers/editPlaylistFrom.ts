import { Map } from '../modules/Store/types';

const editPlaylistForm = (state: number | null, action: Map): number | null => {
  switch (action.type) {
  case 'editPlaylistForm/open':
    return action.payload;
  case 'editPlaylistForm/close':
    return null;
  default:
    return state;
  }
};

export default editPlaylistForm;

import { Map } from '../modules/Store/types';

export default (state: Map, action: Map): Map => {
  const newState = {...state};

  switch (action.type) {
  case 'userPlaylist/delete':
    delete newState[action.payload];
    return newState;
  case 'userPlaylist/edit':
    newState[action.payload.id].title = action.payload.title;
    return newState;
  case 'userPlaylist/get':
    return action.payload;
  case 'logout/user':
    return action.payload;
  default:
    return state;
  }
};

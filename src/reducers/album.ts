import { Map } from '../modules/Store/types';

export const albumPopular = (state: Map, action: Map): Map => {
  if (action.type === 'popular/album') {
    return action.payload;
  }
  return state;
};


export const album = (state: Map, action: Map): Map => {
  if (action.type === 'get/album') {
    for (const [key, value] of Object.entries(action.payload)) {
      state[key] = value;
    }
  }
  return state;
};

export const albumCover = (state: Map, action: Map): Map => {
  if (action.type === 'get/albumCover') {
    for (const [key, value] of Object.entries(action.payload)) {
      state[key] = value;
    }
  }
  return state;
};


import { Map } from '../modules/Store/types';

export const artistPopular = (state: Map, action: Map): Map => {
  if (action.type === 'popular/artist') {
    return action.payload;
  }
  return state;
};

export const artist = (state: Map, action: Map): Map => {
  if (action.type === 'get/artist') {
    return action.payload

  }
  return state;
};

export const artistPopularTracks = (state: Map, action: Map): Map => {
  if (action.type === 'get/artist/popular') {
    return action.payload
  }
  return state;
};

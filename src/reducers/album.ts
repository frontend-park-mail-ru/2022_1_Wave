import { Map } from '../modules/Store/types';

export const albumPopular = (state: Map, action: Map): Map => {
  if (action.type === 'popular/album') {
    return action.payload;
  }
  return state;
};

export const album = (state: Map, action: Map): Map => {
  if (action.type === 'get/album') {
    return action.payload;
  }
  return state;
};

export const albumCover = (state: Map, action: Map): Map => {
  if (action.type === 'get/albumCover') {
    return action.payload;
  }
  return state;
};

export const albumWeek = (state: Map, action: Map): Map => {
  if (action.type === 'week/album') {
    return action.payload;
  }
  return state;
};


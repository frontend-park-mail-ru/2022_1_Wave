import { Map } from '../modules/Store/types';

export const tracksPopular = (state: Map, action: Map): Map => {
  switch (action.type){
  case 'popular/track':
  case 'week/track':
    return action.payload;
  default:
    return state;
  }
};

export const trackWeek = (state: Map, action: Map): Map => {
  if (action.type === 'week/track') {
    return action.payload;
  }
  return state;
};


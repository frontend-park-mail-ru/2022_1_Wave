import { Map } from '../modules/Store/types';

export const artistPopular = (state: Map, action: Map): Map => {
  if (action.type === 'popular/artist') {
    state.popular = action.payload;
  }
  return state;
};

export const artist = (state: Map, action: Map): Map => {
  if (action.type === 'get/artist') {
    for (const [key, value] of Object.entries(action.payload)) {
      console.log('artist:', key, value);
      state[key] = value;
    }
  }
  return state;
};

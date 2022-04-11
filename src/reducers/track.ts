import { Map } from '../modules/Store/types';

const tracksPopular = (state: Map, action: Map): Map => {
  if (action.type === 'popular/track') {
    state.popular = action.payload;
  }
  return state;
};

export default tracksPopular;

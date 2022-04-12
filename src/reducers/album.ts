import { Map } from '../modules/Store/types';

const albumPopular = (state: Map, action: Map): Map => {
  if (action.type === 'popular/album') {
    state.popular = action.payload;
  }
  return state;
};

export default albumPopular;

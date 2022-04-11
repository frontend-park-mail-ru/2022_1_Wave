import { Map } from '../modules/Store/types';

const albumPopular = (state: Map, action: Map): Map => {
  console.log(action.type);
  if (action.type === 'popular/album') {
    state.popular = action.payload;
  }
  return state;
};

export default albumPopular;

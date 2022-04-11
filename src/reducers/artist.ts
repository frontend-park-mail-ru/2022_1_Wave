import { Map } from '../modules/Store/types';

const artistPopular = (state: Map, action: Map): Map => {
  console.log(action.type);
  if (action.type === 'popular/artist') {
    state.popular = action.payload;
  }
  return state;
};

export default artistPopular;

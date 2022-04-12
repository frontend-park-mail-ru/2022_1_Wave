import { Map } from '../modules/Store/types';

const userLogin = (state: Map, action: Map): Map => {
  if (action.type === 'popular/album') {
    state.popular = action.payload;
  }
  return state;
};

export default userLogin;

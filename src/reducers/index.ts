import combineReducers from '../modules/Reducers';
import { playlistPopular } from '../reducers/popular';

const rootReducer = playlistPopular; //combineReducers(playlistPopular);
console.log('root:',rootReducer);

export default rootReducer;

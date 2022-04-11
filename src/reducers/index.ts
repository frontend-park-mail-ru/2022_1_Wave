import combineReducers from '../modules/Reducers';
import tracksPopular from './track';
import albumPopular from './album';
import artistPopular from './artist';

export default combineReducers({ tracksPopular, albumPopular, artistPopular });

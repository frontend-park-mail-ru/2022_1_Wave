import combineReducers from '../modules/Reducers';
import tracksPopular from './track';
import albumPopular from './album';
import { artistPopular, artist, artistPopularTracks } from './artist';
import user from './user';
import { playerPlaylist } from './playlist';
import { playerPlay, playerPosition } from './player';
import notification from './notification';

export default combineReducers({
  tracksPopular,
  albumPopular,
  artistPopular,
  artist,
  artistPopularTracks,
  user,
  playerPlaylist,
  playerPlay,
  playerPosition,
  notification,
});

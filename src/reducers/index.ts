import combineReducers from '../modules/Reducers';
import tracksPopular from './track';
import { albumPopular, album, albumCover } from './album';
import { artistPopular, artist, artistPopularTracks } from './artist';
import user from './user';
import playerPlaylist from './playlist';
import { playerPlay,playDisplay, playerPosition } from './player';
import search from './search';
import notification from './notification';
import sidebar from './sidebar';
import userPlaylists from './userPlaylists';
import favorites from './favorites';
import authRequired from './authRequired';
import userStatus from './userStatus';
import createPlaylistForm from './createPlaylistFrom';

export default combineReducers({
  tracksPopular,
  albumPopular,
  album,
  artistPopular,
  artist,
  albumCover,
  artistPopularTracks,
  user,
  playerPlaylist,
  playerPlay,
  playDisplay,
  playerPosition,
  notification,
  search,
  sidebar,
  userPlaylists,
  favorites,
  authRequired,
  userStatus,
  createPlaylistForm,
});

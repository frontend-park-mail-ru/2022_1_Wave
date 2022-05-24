import Playlist from '../models/Playlist';

export function getPlaylistById(id: number): Function {
  return (dispatch: Function): void => {
    Playlist.getByID(id)
      .then((payload) => {
        dispatch({ type: 'sidePlaylist/get', payload });
      });
  }
}

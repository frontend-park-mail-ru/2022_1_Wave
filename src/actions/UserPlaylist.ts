import Playlist from '../models/Playlist';

export function getPlaylists(): Function {
  return (dispatch: Function): void => {
    Playlist.getOfUser()
      .then((payload) => {
        dispatch({ type: 'userPlaylist/get', payload });
      });
  }
}

export function getPlaylistsById(id): Function {
  return (dispatch: Function): void => {
    Playlist.getOfUserId(id)
      .then((payload) => {
        dispatch({ type: 'userPlaylist/get', payload });
      });
  }
}

export function createPlaylist(title: string): Function {
  return (dispatch: Function): void => {
    Playlist.create({ title })
      .then((): Promise<any> => getPlaylists()(dispatch))
  }
}

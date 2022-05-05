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

export function deleteTrackPlaylist({trackid,playlistid}: {trackid:number,playlistid:number}): Function{
  return (dispatch: Function): void => {
    const payload = {trackid,playlistid}
    Playlist.deleteOfUser({trackid,playlistid})
      .then( () => {
        dispatch({ type: 'userPlaylist/delete', payload});
        dispatch({
          type: `notifier/message`,
          payload: { status: 'success', msg: 'Success' },
        });
      })
  }
}

export function addTrackPlaylist({trackid,playlistid}: {trackid:number,playlistid:number}): Function{
  return (dispatch: Function): void => {
    Playlist.postOfUser({trackid,playlistid})
      .then( () => {
        dispatch({
          type: `notifier/message`,
          payload: { status: 'success', msg: 'Success' },
        });;
      }).then(() => {
        Playlist.getOfUser()
          .then((payload) => {
            dispatch({ type: 'userPlaylist/get', payload });
          });
      }
      )
  }
}

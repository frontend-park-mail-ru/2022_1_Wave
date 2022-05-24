import Playlist from '../models/Playlist';

export function getPlaylists(): Function {
  return (dispatch: Function): void => {
    Playlist.getOfUser()
      .then((payload) => {
        dispatch({ type: 'userPlaylist/get', payload });
      });
  }
}

export function getPlaylistsById(id: number): Function {
  return (dispatch: Function): void => {
    Playlist.getOfUserId(id)
      .then((payload) => {
        dispatch({ type: 'userPlaylist/get', payload });
      });
  }
}

export function deletePlaylistLocal(id: number): any {
  return { type: 'userPlaylist/delete', payload: id };
}

export function editPlaylistLocal(id: number, title: string): any {
  return { type: 'userPlaylist/edit', payload: {id, title} };
}

export function createPlaylist(title: string): Function {
  return (dispatch: Function): void => {
    Playlist.create({ title })
      .then((): Promise<any> => getPlaylists()(dispatch)).then(
        () : Promise<any> => dispatch({
          type: `notifier/message`,
          payload: { status: 'success', msg: `${title} added` },
        })
      )
  }
}

export function editPlaylist(id: number, title: string): Function {
  return (dispatch: Function): void => {
    Playlist.edit({id, title})
      .then((): Promise<any> => dispatch(editPlaylistLocal(id, title)))
      .then(() :Promise<any> => dispatch({
        type: `notifier/message`,
        payload: { status: 'success', msg: `Renamed to ${title}` },
      }))
      .catch(
        () :Promise<any> => dispatch({
          type: `notifier/message`,
          payload: { status: 'error', msg: `Something went wrong. Please, try again later` },
        })
      );
  }
}

export function deletePlaylist(id: number): Function {
  return (dispatch: Function): void => {
    Playlist.delete(id)
      .then((): Promise<any> => dispatch(deletePlaylistLocal(id)))
      .then(() :Promise<any> => dispatch({
        type: `notifier/message`,
        payload: { status: 'success', msg: `Successfully deleted playlist` },
      }))
      .catch(
        () :Promise<any> => dispatch({
          type: `notifier/message`,
          payload: { status: 'error', msg: `Something went wrong. Please, try again later` },
        })
      );
  }
}

export function deleteTrackPlaylist({trackid,playlistid}: {trackid:number,playlistid:number}): Function{
  return (dispatch: Function): void => {
    Playlist.deleteOfUser({trackid,playlistid})
      .then( () => {
        getPlaylists()(dispatch);
        dispatch({
          type: `notifier/message`,
          payload: { status: 'success', msg: 'Successfully deleted' },
        });
      })
      .catch(
        () :Promise<any> => dispatch({
          type: `notifier/message`,
          payload: { status: 'error', msg: `Something went wrong. Please, try again later` },
        })
      );
  }
}

export function addTrackPlaylist({ trackID, playlistID }: { trackID: number, playlistID: number }): Function{
  return (dispatch: Function): void => {
    Playlist.postOfUser({ trackID, playlistID })
      .then( () => {
        dispatch({
          type: `notifier/message`,
          payload: { status: 'success', msg: 'Added' },
        })
      })
      .then(() => {
        Playlist.getOfUser()
          .then((payload) => {
            dispatch({ type: 'userPlaylist/get', payload });
          });
      }
      )
      .catch(
        () :Promise<any> => dispatch({
          type: `notifier/message`,
          payload: { status: 'error', msg: `Something went wrong. Please, try again later` },
        })
      );
  }
}

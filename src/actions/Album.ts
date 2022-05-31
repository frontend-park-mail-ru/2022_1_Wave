import album from '../models/Album';
/*
 * Actions for album domain
 */
export function albumGetPopular(dispatch: Function): void {
  album.getPopular().then((payload: any) => {
    dispatch({ type: 'popular/album', payload });
  });
}

export function albumGetById(id: string): (dispatch: Function) => void {
  return (dispatch: Function): void => {
    album.getAlbumById(id).then((payload: any) => {
      dispatch({ type: 'get/album', payload });
    });
  };
}

export function albumGetCoverById(id: string): (dispatch: Function) => void {
  return (dispatch: Function): void => {
    album.getAlbumCoverById(id).then((payload: any) => {
      dispatch({ type: 'get/albumCover', payload });
    });
  };
}

import album from '../models/Album';
/*
 * Actions for album domain
 */
export function albumGetPopular(dispatch:Function):void {
  album.getPopular()
    .then((payload: any) => {
      dispatch({ type: 'popular/album', payload });
    });
}

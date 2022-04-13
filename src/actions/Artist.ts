import artist from '../models/Artist';
/*
 * Actions for artist domain
 */
export function artistGetPopular(dispatch: Function): void {
  artist.getPopular().then((payload: any) => {
    dispatch({ type: 'popular/artist', payload });
  });
}

export function artistGetById(id:string):(dispatch:Function)=>void {
  return (dispatch:Function):void => {
    artist.getArtistById(id)
      .then((payload: any) => {
        dispatch({ type: 'get/artist', payload });
      });
  };
}

export function artistGetPopularById(id:string):(dispatch:Function)=>void {
  return (dispatch:Function):void => {
    artist.getArtistPopularById(id)
      .then((payload: any) => {
        dispatch({ type: 'get/artist/popular', payload });
      });
  };
}

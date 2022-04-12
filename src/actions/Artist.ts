import artist from '../models/Artist';
/*
 * Actions for artist domain
 */
export function artistGetPopular(dispatch: Function): void {
  artist.getPopular().then((payload: any) => {
    dispatch({ type: 'popular/artist', payload });
  });
}

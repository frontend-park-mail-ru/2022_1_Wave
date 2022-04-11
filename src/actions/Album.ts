import album from '../models/Album';
/*
 * Actions for album domain
 */
/*
   * Get albums in popularity order
   * @returns {Array} - array of albums, where each is like:
   * {
   *   'title': string,
   *   'artist': string,
   *   'cover': string,
   * }
   */
export function getPopularAction(dispatch:Function):void {
  album.getPopular()
    .then((payload: any) => {
      dispatch({ type: 'popular', payload });
    });
}

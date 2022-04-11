import track from '../models/Track';
/*
 * Actions for artist domain
 */
export function trackGetPopular(dispatch:Function):void {
  track.getPopular()
    .then((payload: any) => {
      dispatch({ type: 'popular/track', payload });
    });
}

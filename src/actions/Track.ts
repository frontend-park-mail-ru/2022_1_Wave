import track from '../models/Track';
/*
 * Actions for artist domain
 */
export function trackGetPopular(dispatch: Function): void {
  track.getPopular().then((payload: any) => {
    dispatch({ type: 'popular/track', payload });
  })
    .catch(
      () :Promise<any> => dispatch({
        type: `notifier/message`,
        payload: { status: 'error', msg: `Something went wrong. Please, try again later` },
      })
    );;
}

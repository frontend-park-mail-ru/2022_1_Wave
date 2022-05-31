import track from '../models/Track';
/*
 * Actions for artist domain
 */
export function trackGetPopular(dispatch: Function): void {
  track.getWeek().then((payload: any) => {
    dispatch({ type: 'playlist/update', payload });
    dispatch({ type: 'popular/track', payload });
  })
    .catch(
      () :Promise<any> => dispatch({
        type: `notifier/message`,
        payload: { status: 'error', msg: `Something went wrong. Please, try again later` },
      })
    );;
}

export function trackGetWeek(dispatch: Function): void {
  track.getWeek().then((payload: any) => {
    dispatch({ type: 'week/track', payload });
  })    .catch(
    () :Promise<any> => dispatch({
      type: `notifier/message`,
      payload: { status: 'error', msg: `Something went wrong. Please, try again later` },
    })
  );;
}

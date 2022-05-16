import track from '../models/Track';
import { ITrack } from '../modules/Media/media';

/*
 * Actions for playlist
 */
export function getPopularTracks(dispatch: Function): void {
  track.getPopular().then((payload: any) => {
    dispatch({ type: 'playlist/update', payload });
    dispatch({ type: 'popular/track', payload });
  });
}

export function addTrack(newTrack: ITrack): (dispatch: Function) => void {
  return (dispatch: Function): void => {
    dispatch({ type: 'playlist/add', payload: newTrack });
  };
}

export function setTrack(newTrack: ITrack): (dispatch: Function) => void {
  return (dispatch: Function): void => {
    dispatch({ type: 'playlist/update', payload: Array(newTrack) });
  };
}

export function setTracks(tracks: ITrack[]): (dispatch: Function) => void {
  return (dispatch: Function): void => {
    dispatch({ type: 'playlist/update', payload: tracks });
  };
}

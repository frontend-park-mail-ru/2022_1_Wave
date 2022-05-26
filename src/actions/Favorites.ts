import Favorites from '../models/Favorites';

export const getFavorites = (): Function => (dispatch: Function): void => {
  Favorites.get().then((payload) => dispatch({
    payload,
    type: 'favorites/get',
  }));
}

export function addToFavorites(trackID: number): Function {
  return (dispatch: Function): void => {
    Favorites.add(trackID).then(() => getFavorites()(dispatch))
      .then(() :Promise<any> => dispatch({
        type: `notifier/message`,
        payload: { status: 'success', msg: `Added to favorites` },
      }))
      .catch(
        () :Promise<any> => dispatch({
          type: `notifier/message`,
          payload: { status: 'error', msg: `Something went wrong. Please, try again later` },
        })
      );
  }
}

export function removeFromFavorites(trackID: number): Function {
  return (dispatch: Function): void => {
    Favorites.remove(trackID).then(() => getFavorites()(dispatch))
      .then(() :Promise<any> => dispatch({
        type: `notifier/message`,
        payload: { status: 'success', msg: `Removed from favorites` },
      }))
      .catch(
        () :Promise<any> => dispatch({
          type: `notifier/message`,
          payload: { status: 'error', msg: `Something went wrong. Please, try again later` },
        })
      );
  }
}

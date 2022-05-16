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
  }
}

export function removeFromFavorites(trackID: number): Function {
  return (dispatch: Function): void => {
    Favorites.remove(trackID).then(() => getFavorites()(dispatch))
  }
}

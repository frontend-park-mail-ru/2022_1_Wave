import HTTPClient from '../modules/Client/Client';
import Paths from '../config/Favorites';

export default class Favorites {
  static get(): Promise<any> {
    return HTTPClient.get(Paths.favorites)
      .then((response) => {
        if (response.status !== 200) {
          return Promise.reject(response.body);
        }

        return response.body.Result;
      });
  }

  static add(trackID: number): Promise<any> {
    return HTTPClient.post(`${Paths.favorites}/${trackID}`, null)
      .then((response) => {
        if (response.status !== 200) {
          return Promise.reject(response.body);
        }

        return response.body.Result;
      });
  }

  static remove(trackID: number): Promise<any> {
    return HTTPClient.delete(`${Paths.favorites}/${trackID}`)
      .then((response) => {
        if (response.status !== 200) {
          return Promise.reject(response.body);
        }

        return response.body.Result;
      });
  }
}

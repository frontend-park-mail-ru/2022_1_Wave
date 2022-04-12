import HTTPClient from '../modules/Client/Client';
import Paths from '../config/Album';

/*
 * Requests for album domain
 */
export default class Album {
  /*
   * Get albums in popularity order
   * @returns {Array} - array of albums, where each is like:
   * {
   *   'title': string,
   *   'artist': string,
   *   'cover': string,
   * }
   */
  static getPopular() {
    return HTTPClient.get(Paths.popular).then((response) => {
      if (response.status !== 200) {
        return Promise.reject(response.body);
      }
      return response.body.Result;
    });
  }
}

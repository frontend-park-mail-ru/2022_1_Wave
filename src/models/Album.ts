import HTTPClient from '../modules/Client/Client.js';
import Paths from '../config/Album.js';

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
    return HTTPClient.get('api/v1/tracks/popular')//Paths.popular)
      .then((response) => {
        if (response.status !== 200) {
          return Promise.reject(response.body);
        }
        return response.body.Result;
      });
  }
}

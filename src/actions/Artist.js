import HTTPClient from '/modules/Client/Client.js';
import Paths from '/config/Artist.js';

/*
 * Requests for artist domain
 */
export default class Artist {
  /*
   * Get artists in popularity order
   * @returns {Array} - array of artists, where each is like:
   * {
   *   'name': string,
   *   'cover': string,
   * }
   */
  static getPopular() {
    return HTTPClient.get(Paths.popular)
      .then((response) => {
        if (response.status !== 200) {
          return Promise.reject(response.body);
        }
        return response.body.Result;
      });
  }
}

import HTTPClient from '../modules/Client/Client';
import Paths from '../config/Track';

/*
 * Requests for song domain
 */
export default class Song {
  /*
   * Get songs in popularity order
   * @returns {Array} - array of songs, where each is like:
   * {
   *   'title': string,
   *   'artist': string,
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

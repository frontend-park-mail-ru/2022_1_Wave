import HTTPClient from '../modules/Client/Client';
import Paths from '../config/Artist';
import { Map } from '../modules/Store/types';
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
    return HTTPClient.get(Paths.popular).then((response) => {
      if (response.status !== 200) {
        return Promise.reject(response.body);
      }
      return response.body.Result;
    });
  }

  static getArtistById(id:string) {
    return HTTPClient.get(Paths.artistID + id.toString())
      .then((response) => {
        if (response.status !== 200) {
          return Promise.reject(response.body);
        }
        console.log("req id:",id);
        const res:Map = {};
        res[id] = response.body.Result;
        return res;
      });
  }

  static getArtistPopularById(id:string) {
    const url = Paths.artistPopular.replace('{id}',id.toString())
    return HTTPClient.get(url)
      .then((response) => {
        if (response.status !== 200) {
          return Promise.reject(response.body);
        }
        console.log("req id:",id);
        const res:Map = {};
        res[id] = response.body.Result;
        return res;
      });
  }
}

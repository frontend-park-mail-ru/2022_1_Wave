import HTTPClient from '../modules/Client/Client';
import Paths from '../config/Album';
import { Map } from '../modules/Store/types';

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

  static getAlbumById(id: string) {
    return HTTPClient.get(Paths.albumID + id.toString()).then((response) => {
      if (response.status !== 200) {
        return Promise.reject(response.body);
      }
      const res: Map = {};
      res[id] = response.body.Result;
      return res;
    });
  }

  static getAlbumCoverById(id: string) {
    return HTTPClient.get(Paths.albumCoverID + id.toString()).then((response) => {
      if (response.status !== 200) {
        return Promise.reject(response.body);
      }
      const res: Map = {};
      res[id] = response.body.Result;
      return res;
    });
  }

  static getWeek() {
    return HTTPClient.get(Paths.albumWeek).then((response) => {
      if (response.status !== 200) {
        return Promise.reject(response.body);
      }
      return response.body.Result;
    });
  }
}

import HTTPClient from '../modules/Client/Client';
import Paths from '../config/Track';

/*
 * Requests for album domain
 */
export default class Track {
  /*
   * Get albums in popularity order
   * @returns {Array} - array of albums, where each is like:
   * "title": "jjnzqkuuiw",
   * "artist": "ilcgnzjgnp",
   * "cover": "assets/track_3.png",
   * "src": "assets/track_3.mp4",
   * "likes": 6326,
   * "listenings": 8761,
   * "duration": 209
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

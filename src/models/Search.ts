import HTTPClient from '../modules/Client/Client';
import Paths from '../config/Search';

/*
 * Requests for search
 */
export default class Search {
  static getMatched(toFind: string) {
    return HTTPClient.get(Paths.search + toFind.toString()).then((response) => {
      if (response.status !== 200) {
        return Promise.reject(response.body);
      }
      return response.body.Result;
    });
  }
}

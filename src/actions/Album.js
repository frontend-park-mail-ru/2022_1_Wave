import HTTPClient from '/modules/Client/Client.js';
import Paths from '/config/Album.js';

export default class Album {
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

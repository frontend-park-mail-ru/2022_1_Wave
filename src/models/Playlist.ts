import HTTPClient from '../modules/Client/Client';
import Paths from '../config/Playlist';

export default class Playlist {
  static create({ title }: { title: string }): Promise<any> {
    return HTTPClient.post(Paths.playlist, {
      title,
    })
      .then((response) => {
        if (response.status !== 200) {
          return Promise.reject(response.body);
        }

        return response.body.Result;
      });
  }

  static getOfUser(): Promise<any> {
    return HTTPClient.get(Paths.ofCurrentUser)
      .then((response) => {
        if (response.status !== 200) {
          return Promise.reject(response.body);
        }

        return response.body.Result;
      });
  }
}

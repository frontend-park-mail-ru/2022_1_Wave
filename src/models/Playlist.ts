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

  static edit({ id, title }: { id: number, title: string }): Promise<any> {
    return HTTPClient.put(`${Paths.playlist}`, {
      id,
      title,
    })
      .then((response) => {
        if (response.status !== 200) {
          return Promise.reject(response.body);
        }

        return response.body.Result;
      });
  }

  static delete(id: number): Promise<any> {
    return HTTPClient.delete(`${Paths.playlist}${id}`)
      .then((response) => {
        if (response.status !== 200) {
          return Promise.reject(response.body);
        }

        return response.body.Result;
      })
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

  static getOfUserId( id:number): Promise<any> {
    return HTTPClient.get(`${Paths.ofCurrentUser  }/${  id.toString()}`)
      .then((response) => {
        if (response.status !== 200) {
          return Promise.reject(response.body);
        }

        return response.body.Result;
      });
  }

  static deleteOfUser({trackid,playlistid}: {trackid:number,playlistid:number}): Promise<any> {
    return HTTPClient.delete(`${Paths.ofCurrentUser  }?playlistId=${
      playlistid.toString()  }&trackId=${  trackid.toString()}`).then((response) => {
      if (response.status !== 200) {
        return Promise.reject(response.body);
      }
      return response.body.Result;
    });
  }

  static postOfUser({trackID, playlistID}: {trackID:number,playlistID:number}): Promise<any> {
    return HTTPClient.post(Paths.ofCurrentUser ,{
      playlistId: playlistID,
      trackId: trackID,
    }).then((response) => {
      if (response.status !== 200) {
        return Promise.reject(response.body);
      }
      return response.body.Result;
    });
  }
}

import HTTPClient from '../modules/Client/Client';
import Paths from '../config/Sharing';

export default class Sharing {
  static shrink(url: string): Promise<any> {
    return HTTPClient.post(Paths.schema, { url }).then((response) => {
      if (response.status !== 200) {
        return Promise.reject(response.body);
      }
      return response.body.Result.hash;
    }).catch((e) => {
      console.error('Sharing.shrink', e);
      return url;
    })
  }
}

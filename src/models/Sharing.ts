import HTTPClient from '../modules/Client/Client';
import Paths from '../config/Sharing';

export default class Sharing {
  static shrink(url: string): Promise<any> {
    return fetch(Paths.schema, {
      method: 'POST',
      body: JSON.stringify({ url }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status !== 200) {
          return Promise.reject(response.body);
        }
        return response.body.Result.hash;
      })
      .catch((e) => {
        console.error('Sharing.shrink', e);
        return url;
      })
  }
}

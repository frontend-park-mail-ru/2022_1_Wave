import Paths from '../config/Sharing';

export default class Sharing {
  static shrink(url: string): Promise<any> {
    return fetch(Paths.schema, {
      method: 'POST',
      body: JSON.stringify({ url }),
      headers: {
        'Content-Type': 'application/json',
      } as HeadersInit,
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          return Promise.reject(response);
        }
        return `${Paths.schema}${response.Result.hash}`;
      })
      .catch((e) => {
        console.error('Sharing.shrink error:', e);
        return url;
      })
  }
}

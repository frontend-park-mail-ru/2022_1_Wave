export const config = {
  url: 'http://localhost:8080',
  csrfHeader: 'X-CSRF-TOKEN',
  files: 'http://localhost:8080/',
};

export default class Client {
  static fullUrl(path: string): string {
    return `${config.url}/${path}`;
  }

  /*
   * GET запрос на бэкенд
   * @param {string} path - путь, относительно домена
   */
  static get(path: string): Promise<any> {
    let status: any = null;

    return fetch(this.fullUrl(path), {
      method: 'GET',
      headers: {
        [config.csrfHeader]: localStorage.getItem('csrf'),
      } as HeadersInit,
    })
      .then((response) => {
        if (response.headers.has(config.csrfHeader)) {
          localStorage.setItem('csrf', response.headers.get(config.csrfHeader)!);
        }

        status = response.status;

        return response.json();
      })
      .then((body) => ({
        status,
        body,
      }));
  }

  /*
   * POST запрос на бэкенд
   * @param {string} path - путь, относительно домена
   * @param {Object} body - тело запроса
   */
  static post(path: string, requestBody: any): Promise<any> {
    let status: any = null;

    return fetch(this.fullUrl(path), {
      method: 'POST',
      body: requestBody ? JSON.stringify(requestBody) : undefined,
      headers: {
        [config.csrfHeader]: localStorage.getItem('csrf'),
        'Content-Type': 'application/json',
      } as HeadersInit,
    })
      .then((response) => {
        status = response.status;
        return response.json().catch(() => null);
      })
      .then((body) => ({
        status,
        body,
      }));
  }

  static delete(path: string): Promise<any> {
    let status: any = null;

    return fetch(this.fullUrl(path), {
      method: 'DELETE',
      headers: {
        [config.csrfHeader]: localStorage.getItem('csrf'),
        'Content-Type': 'application/json',
      } as HeadersInit,
    })
      .then((response) => {
        status = response.status;
        return response.json().catch(() => null);
      })
      .then((body) => ({
        status,
        body,
      }));
  }

  static patch(path: string, requestBody: any): Promise<any> {
    let status: any = null;

    return fetch(this.fullUrl(path), {
      method: 'PATCH',
      body: JSON.stringify(requestBody),
      headers: {
        [config.csrfHeader]: localStorage.getItem('csrf'),
        'Content-Type': 'application/json',
      } as HeadersInit,
    })
      .then((response) => {
        status = response.status;
        return response.json().catch(() => null);
      })
      .then((body) => ({
        status,
        body,
      }));
  }

  static patchForm(path: string, requestBody: any): Promise<any> {
    let status: any = null;
    return fetch(this.fullUrl(path), {
      method: 'PATCH',
      body: requestBody,
      headers: {
        [config.csrfHeader]: localStorage.getItem('csrf'),
        enctype: 'multipart/form-data',
      } as HeadersInit,
    })
      .then((response) => {
        status = response.status;
        return response.json().catch(() => null);
      })
      .then((body) => ({
        status,
        body,
      }));
  }
}

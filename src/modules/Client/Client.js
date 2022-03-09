const config = {
  url: 'http://localhost',
  csrfHeader: 'X-CSRF-TOKEN',
};

export default class Client {
  static fullUrl(path) {
    return `${config.url}/${path}`;
  }

  /*
   * GET запрос на бэкенд
   * @param {string} path - путь, относительно домена
   */
  static get(path) {
    let status = null;

    return fetch(this.fullUrl(path), {
      method: 'GET',
      headers: {
        [config.csrfHeader]: localStorage.getItem('csrf'),
      },
    })
      .then((response) => {
        if (response.headers.has(config.csrfHeader)) {
          localStorage.setItem('csrf', response.headers.get(config.csrfHeader));
        }

        status = response.status;

        return response.json()
          .catch(() => null);
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
  static post(path, requestBody) {
    let status = null;

    return fetch(this.fullUrl(path), {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        [config.csrfHeader]: localStorage.getItem('csrf'),
      },
    })
      .then((response) => {
        status = response.status;
        return response.json()
          .catch(() => null);
      })
      .then((body) => ({
        status,
        body,
      }));
  }
}

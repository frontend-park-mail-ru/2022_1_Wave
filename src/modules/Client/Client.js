const config = {
  url: '',
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
    return fetch(this.fullUrl(path), {
      method: 'GET',
    })
      .then((response) => {
        if (response.headers.has(config.csrfHeader)) {
          localStorage.setItem('csrf', response.headers.get(config.csrfHeader));
        }

        return {
          status: response.status,
          body: response.body,
        };
      });
  }

  /*
   * POST запрос на бэкенд
   * @param {string} path - путь, относительно домена
   * @param {Object} body - тело запроса
   */
  static post(path, body) {
    return fetch(this.fullUrl(path), {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        [config.csrfHeader]: localStorage.getItem('csrf'),
      },
    })
      .then((response) => ({
        status: response.status,
        body: response.body,
      }));
  }
}

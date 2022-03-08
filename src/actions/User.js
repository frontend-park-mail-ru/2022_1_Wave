import HTTPClient from '/modules/Client/Client.js';
import UserPaths from '/config/User.js';

export default class User {
  static getCSRFToken() {
    return HTTPClient.get(UserPaths.csrf);
  }

  static getUser() {
    return HTTPClient.get(UserPaths.info)
      .then((response) => {
        if (response.status !== 200) {
          return Promise.reject(response.body);
        }
        return response.body;
      });
  }

  static logout() {
    let body = null;

    return HTTPClient.post(UserPaths.logout)
      .then((response) => {
        if (response.status !== 200) {
          return Promise.reject(response.body);
        }
        body = response.body;

        return User.getCSRFToken();
      })
      .then(() => body);
  }

  static login({ email, username, password }) {
    return HTTPClient.post(UserPaths.login, {
      email,
      username,
      password,
    })
      .then((response) => {
        if (response.status !== 200) {
          return Promise.reject(response.body);
        }
        return response.body;
      });
  }

  static signup({ email, username, password }) {
    return HTTPClient.post(UserPaths.signup, {
      email,
      username,
      password,
    })
      .then((response) => {
        if (response.status !== 200) {
          return Promise.reject(response.body);
        }
        return response.body;
      });
  }
}

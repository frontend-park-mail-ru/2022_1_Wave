import HTTPClient from '../modules/Client/Client.js';
import UserPaths from '../config/User.js';

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
    return HTTPClient.post(UserPaths.logout);
  }

  static login({ email, username, password }) {
    return HTTPClient.post(UserPaths.login, {
      email,
      username,
      password,
    });
  }

  static signup({ email, username, password }) {
    return HTTPClient.post(UserPaths.signup, {
      email,
      username,
      password,
    });
  }
}

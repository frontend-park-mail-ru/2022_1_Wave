import HTTPClient from '../modules/Client/Client';
import UserPaths from '../config/User';

/*
 * Requests for user domain
 */
export default class User {
  /*
   * Sets CSRF-token in LocalStorage
   */
  static getCSRFToken() {
    return HTTPClient.get(UserPaths.csrf);
  }

  /*
   * Get current user info
   * @returns {Object} - Current user object:
   * {
   *   'id': number,
   *   'username': string,
   * }
   */
  static getUser() {
    return HTTPClient.get(UserPaths.info)
      .then((response) => {
        if (response.status !== 200) {
          return Promise.reject(response.body);
        }
        return response.body;
      });
  }

  /*
   * Perform logout
   */
  static logout() {
    let body = null;

    return HTTPClient.post(UserPaths.logout, null)
      .then((response) => {
        if (response.status !== 200) {
          return Promise.reject(response.body);
        }
        body = response.body;

        return User.getCSRFToken();
      })
      .then(() => body);
  }

  /*
   * Perform login
   * @param {Object} - object like:
   * {
   *   'email': string,
   *   'username': string,
   *   'password': string,
   * }
   */
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

  /*
   * Perform signup
   * @param {Object} - object like:
   * {
   *   'email': string,
   *   'username': string,
   *   'password': string,
   * }
   */
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

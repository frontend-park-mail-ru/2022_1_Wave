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
    return HTTPClient.get(UserPaths.csrf).then((response) => {
      return response;
    });
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
      })
      .then((body: any) => {
        if (body.status !== 'OK') {
          return Promise.reject(body.result);
        }
        return body.result;
      });
  }

  /*
   * Perform logout
   */
  static logout() {
    return HTTPClient.post(UserPaths.logout, null).then((response) => {
      if (response.status !== 200) {
        return Promise.reject(response.body);
      }

      return User.getCSRFToken();
    });
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
    }).then((response) => {
      if (response.status !== 200) {
        return Promise.reject(response.body);
      }
      return User.getUser();
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
  static signup(data: { email: string; username: string; password: string }) {
    return HTTPClient.post(UserPaths.signup, data).then((response) => {
      if (response.status !== 200) {
        return Promise.reject(response.body);
      }
      return User.getUser();
    });
  }

  static updateUser(form: any) {
    return HTTPClient.patch(UserPaths.update, form).then((response) => {
      if (response.status !== 200) {
        return Promise.reject(response.body);
      }
      return response.body;
    });
  }

  static uploadAvatar(form: any) {
    return HTTPClient.patchForm(UserPaths.updateAvatar, form).then((response) => {
      if (response.status !== 200) {
        return Promise.reject(response.body);
      }
      return response.body;
    });
  }
}

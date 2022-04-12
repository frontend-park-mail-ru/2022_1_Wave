import user from '../models/User';
/*
 * Actions for artist domain
 */
export function userGetCSRF(dispatch: Function): void {
  user.getCSRFToken().then((payload: any) => {
    dispatch({ type: 'csrf/user', payload });
  });
}

export function userGetSelf(dispatch: Function): void {
  user.getUser().then((payload: any) => {
    dispatch({ type: 'self/user', payload });
  });
}

export function userLogout(dispatch: Function): void {
  user.logout().then(() => {
    dispatch({ type: 'logout/user', payload: null });
  });
}

export function userLogin(form: any): (dispatch: Function) => void {
  return (dispatch: Function): void => {
    user.login(form).then((payload: any) => {
      dispatch({ type: 'logout/user', payload });
    });
  };
}

export function userSignup(form: any): (dispatch: Function) => void {
  return (dispatch: Function): void => {
    user.signup(form).then((payload: any) => {
      dispatch({ type: 'signup/user', payload });
    });
  };
}

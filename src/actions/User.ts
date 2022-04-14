import user from '../models/User';
/*
 * Actions for artist domain
 */
export function userGetCSRF(dispatch: Function): void {
  user.getCSRFToken().then((payload: any) => {
    dispatch({ type: 'csrf/user', payload });
  });
}

export function userGetSelf(): (dispatch: Function) => void {
  return (dispatch: Function): void => {
    user.getUser().then((payload: any) => {
      dispatch({ type: 'self/user', payload });
    }).catch(() => ({type: 'self/user', payload: null}));
  }
}

export function userLogout(): (dispatch: Function) => void {
  return (dispatch: Function): void => {
    user.logout().then(() => {
      dispatch({ type: 'logout/user', payload: null });
    });
  }
}

export function userLogin(form: any): (dispatch: Function) => void {
  return (dispatch: Function): void => {
    user.login(form).then((payload: any) => {
      dispatch({ type: 'login/user', payload });
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

export function updateSelf(form: any): (dispatch: Function) => void {
  return (dispatch: Function): void => {
    user.updateUser(form).then((payload: any) => {
      dispatch({ type: 'update/user', payload });
    });
  };
}

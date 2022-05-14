import user from '../models/User';
import { getPlaylists }  from './UserPlaylist';
import { getFavorites }  from './Favorites';

/*
 * Actions for artist domain
 */

export function userSet(partialUser: any): (_dispatch: Function) => void {
  return (dispatch: Function): void => {
    dispatch({type: 'set/user', payload: partialUser});
  }
}

export function userGetCSRF(dispatch: Function): void {
  user.getCSRFToken().then((payload: any) => {
    dispatch({ type: 'csrf/user', payload });
  });
}

export function userGetSelf(): (_dispatch: Function) => void {
  return (dispatch: Function): void => {
    user
      .getUser()
      .then((payload: any) => {
        dispatch({ type: 'self/user', payload });
      })
      .catch(() => dispatch({ type: 'self/user', payload: null }))
  };
}

export function userGetSelfFull(): (_dispatch: Function) => void {
  return (dispatch: Function): void => {
    user
      .getUser()
      .then((payload: any) => {
        dispatch({ type: 'self/user', payload });
        getPlaylists()(dispatch);
        getFavorites()(dispatch);
      })
      .catch(() => dispatch({ type: 'self/user', payload: null }))
  };
}

export function userLogout(): (_dispatch: Function) => void {
  return (dispatch: Function): void => {
    user.logout().then(() => {
      dispatch({ type: 'logout/user', payload: null });
    });
  };
}

export function userLogin(form: any): (_dispatch: Function) => void {
  return (dispatch: Function): void => {
    user
      .login(form)
      .then((payload: any) => {
        dispatch({ type: 'login/user', payload });
        getPlaylists()(dispatch);
        getFavorites()(dispatch);
        dispatch({
          type: `notifier/message`,
          payload: { status: 'success', msg: 'Success' },
        });
      })
      .catch(() => {
        dispatch({
          type: `notifier/message`,
          payload: { status: 'error', msg: 'Invalid login or password' },
        });
      });
  };
}

export function userSignup(form: any): (_dispatch: Function) => void {
  return (dispatch: Function): void => {
    user
      .signup(form)
      .then((payload: any) => {
        dispatch({ type: 'signup/user', payload });
        getPlaylists()(dispatch);
        getFavorites()(dispatch);
        dispatch({
          type: `notifier/message`,
          payload: { status: 'success', msg: 'Success' },
        });
      })
      .catch(() => {
        dispatch({
          type: `notifier/message`,
          payload: { status: 'error', msg: 'User already exists' },
        });
      });
  };
}

export function updateSelf(form: any): (_dispatch: Function) => void {
  return (dispatch: Function): void => {
    user.updateUser(form).then((payload: any) => {
      dispatch({ type: 'update/user', payload });
    });
  };
}

export function updateAvatar(form: any): (_dispatch: Function) => void {
  return (dispatch: Function): void => {
    user.uploadAvatar(form).then((payload: any) => {
      dispatch({ type: 'update/avatar', payload });
    });
  };
}

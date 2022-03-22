export const createLoggerMiddleware = store => dispatch => action => {
    console.log('action', action);
    dispatch(action);
    console.log('state', store.getState());
}

export const createThunkMiddleware = store => dispatch => action => {
    if (typeof action === 'function') {
        return action(dispatch, store.getState());
    }
    return dispatch(action);
}

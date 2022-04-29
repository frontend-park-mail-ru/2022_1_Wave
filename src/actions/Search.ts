import search from "../models/Search";

export function SearchRequest(request: string): (dispatch: Function) => void {
  return (dispatch: Function): void => {
    search.getMatched(request).then((payload: any) => {
      dispatch({ type: `search/request`, payload});
    })
      .catch(() => {
        dispatch({
          type: `notifier/message`,
          payload: { status: 'error', msg: 'None network' },
        });
      })
  };
}

export function Clear(dispatch: Function): void {
  dispatch({ type: `search/clear`, payload: null });
}

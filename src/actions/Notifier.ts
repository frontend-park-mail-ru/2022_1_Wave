export type NotifyType = {
  status: string;
  msg: string;
};

export function notify(noty: NotifyType): (dispatch: Function) => void {
  return (dispatch: Function): void => {
    dispatch({ type: `notifier/message`, payload: noty });
  };
}

export function purge(dispatch: Function): void {
  dispatch({ type: `notifier/purge`, payload: null });
}

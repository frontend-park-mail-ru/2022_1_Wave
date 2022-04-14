/*
 * Actions for playlist
 */
export function startPlay(dispatch: Function): void {
  const status: boolean = true;
  const res: object = {
    value: status,
  };
  dispatch({ type: 'player/status', payload: res });
}

export function stopPlay(dispatch: Function): void {
  const status: boolean = false;
  const res: object = {
    value: status,
  };
  dispatch({ type: 'player/status', payload: res });
}

export function setPosition(pos: number): (dispatch: Function) => void {
  return (dispatch: Function): void => {
    console.log('SesetPositiont:', pos);
    const res: object = {
      value: pos,
    };
    dispatch({ type: 'player/position', payload: res });
  };
}

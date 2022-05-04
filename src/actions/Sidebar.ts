export function openSidebar(dispatch: Function): void {
  dispatch({ type: 'sidebar/open', payload: true });
}

export function closeSidebar(dispatch: Function): void {
  dispatch({ type: 'sidebar/close', payload: false });
}

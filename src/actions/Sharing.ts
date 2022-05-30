import Sharing from '../models/Sharing';

export function shrink(url: string): (_dispatch: Function) => void {
  return (dispatch: Function): void => {
    Sharing.shrink(url)
      .then((shrinkUrl: string) => {
        window.navigator.clipboard.writeText(shrinkUrl)
          .then(() => {
            dispatch({
              type: 'notifier/message',
              payload: {status: 'success', msg: 'Link copied to clipboard'},
            });
          })
      })
  }
}

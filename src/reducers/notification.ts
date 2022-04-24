import { Map } from '../modules/Store/types';

export default (state: Map, action: Map): Map | null => {
  switch (action.type) {
    case 'notifier/message':
    case 'notifier/purge':
      return action.payload;
    default:
      return state;
  }
};

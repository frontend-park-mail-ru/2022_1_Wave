import { Map } from '../modules/Store/types';

export const playerPlay = (state: Map, action: Map): Map => {
  if (action.type === 'player/status') {
    return action.payload;
  }
  return state;
};

export const playDisplay = (state: Map, action: Map): Map => {
  switch (action.type) {
  case 'player/status':
  case 'player/show':
    return action.payload;
  default:
    return state
  }
};

export const playerPosition = (state: Map, action: Map): Map => {
  if (action.type === 'player/position') {
    return action.payload;
  }
  return state;
};

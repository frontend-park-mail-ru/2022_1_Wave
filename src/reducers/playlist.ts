import {Map} from "../modules/Store/types";

export const playerPlaylist = (state: Map, action: Map): Map => {
  if (action.type === 'playlist/update') {
    return action.payload;
  }
  if ( action.type === 'playlist/add'){
    const newState = state
    newState.push(action.payload)
    return newState
  }
  return state;
};
import { Map } from '../modules/Store/types';
import playlist from "../config/Playlist";

export const userPlaylists = (state: Map, action: Map): Map => {
  switch (action.type) {
  case 'userPlaylist/get':
    return action.payload;
  case 'userPlaylist/delete':
    const newState = state.reduce((accum,playlist) => {
      if(!playlist.tracks){
        accum.push(playlist);
        return accum;
      }
      const newTracks = [];
      if (playlist.id === action.payload.playlistid) {
        playlist.tracks = playlist.tracks.filter(track => track.id !== action.payload.trackid)
      }
      accum.push(playlist);
      return accum
    },[])
    return newState
  default:
    return state;
  }
};

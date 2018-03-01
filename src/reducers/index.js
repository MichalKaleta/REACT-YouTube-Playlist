import { combineReducers } from 'redux';
import VideoReducer from './video_reducer'
import ActiveVideoReducer from './active_video_reducer';
import AddToPlaylist from './add_to_palylist_reducer';
import PlaylistToPlayer from './playlistToPlayer_reducer';

const rootReducer = combineReducers({
  
  videoList : VideoReducer,
  activeVideo: ActiveVideoReducer,
  playlist: AddToPlaylist,
  videosQueue: PlaylistToPlayer

});

export default rootReducer;

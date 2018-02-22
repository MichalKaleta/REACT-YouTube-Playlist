import { combineReducers } from 'redux';
import   VideoReducer from './video_reducer'
import   ActiveVideoReducer from './active_video_reducer'

const rootReducer = combineReducers({
  videoList : VideoReducer,
  activeVideo: ActiveVideoReducer
});

export default rootReducer;

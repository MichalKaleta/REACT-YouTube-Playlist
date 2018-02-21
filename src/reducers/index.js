import { combineReducers } from 'redux';
import   VideoReducer from './video_reducer'

const rootReducer = combineReducers({
  videoList : VideoReducer
});

export default rootReducer;

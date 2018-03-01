import Redux from 'redux';

import { PLAY_VIDEO} from '../actions';

export default function(state={}, action){

  switch(action.type){
     
    case PLAY_VIDEO:
      return action.payload;

    default:
      return state;
  }


}

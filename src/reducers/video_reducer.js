import Redux from 'redux';

import {FETCH_VIDEOS} from '../actions/index';

export default function(state=[], action){

  switch(action.type){
    case FETCH_VIDEOS:
      return state.push("PUSHED")
    
    default:
      return state;
  }


}

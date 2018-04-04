import Redux from 'redux' ;

import {ADD_TO_PLAYLIST} from '../actions';
import {REMOVE_FROM_PLAYLIST} from '../actions';

export default function(state =[] ,action ){

  switch(action.type){

    case ADD_TO_PLAYLIST:  
      return state.concat(action.payload);

    case REMOVE_FROM_PLAYLIST:
      return state.slice(1,state.length+1)

    default:
      return state;
  }

  
}



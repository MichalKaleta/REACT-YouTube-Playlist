import Redux from 'redux' ;

import {ADD_TO_PLAYLIST} from '../actions';
import {REMOVE_FROM_PLAYLIST} from '../actions';

export default function(state =[] ,action ){

  switch(action.type){

    case ADD_TO_PLAYLIST:  
      return state.concat(action.payload);

    case REMOVE_FROM_PLAYLIST:
      console.log(state.slice(action.payload,0));
      return state.slice(0,action.payload).concat(state.slice(action.payload+1,state.length))

    default:  
      return state;
  }

  
}



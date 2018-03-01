import Redux from 'redux' ;

import {ADD_TO_PLAYLIST} from '../actions';

export default function(state =[] ,action ){

  switch(action.type){

    case ADD_TO_PLAYLIST:
      
      return state.concat(action.payload);

    default:
      return state;
  }

  
}



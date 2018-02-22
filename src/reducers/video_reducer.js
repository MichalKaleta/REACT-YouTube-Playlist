import Redux from 'redux';

import {FETCH_VIDEOS } from '../actions';

export default function(state={}, action){

  switch(action.type){
    
    case FETCH_VIDEOS:
    console.log(state)
      return action.payload;

    default:
      return state;
  }


}

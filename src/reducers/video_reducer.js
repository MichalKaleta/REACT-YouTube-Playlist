import Redux from 'redux';

import {FETCH_VIDEOS } from '../actions';

export default function(state=[], action){

  switch(action.type){
    
    case FETCH_VIDEOS:
   console.log(state.concat(action.payload))
      return state.concat(action.payload);

    default:
      return state;
  }


}

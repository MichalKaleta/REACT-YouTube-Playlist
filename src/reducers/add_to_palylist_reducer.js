import Redux from 'redux' ;

import {ADD_TO_PLAYLIST} from '../actions';
import {REMOVE_FROM_PLAYLIST} from '../actions';
import { REARANGE_PLAYLIST } from '../actions'

export default function(state =[] ,action ){

  switch(action.type){

    case ADD_TO_PLAYLIST:  
      return state.concat(action.payload);

    case REMOVE_FROM_PLAYLIST:
      return state.slice(  0,action.payload  ).concat(  state.slice(action.payload+1,state.length)  )

    case REARANGE_PLAYLIST:
      var  dragIdx =action.payload.dragedIndex;
      var  dropIdx =action.payload.dropIndex;
      console.log(dragIdx,dropIdx)
      var newPlay =state.slice(0,dragIdx)
                  .concat(  state.slice(dragIdx+1,dropIdx)  )
                  .concat(  state[dragIdx]  )
                  .concat(  state.slice(dropIdx,state.length+1) ) 
      console.log(newPlay)
      return  newPlay

    default:  
      return state;
  }

  
}



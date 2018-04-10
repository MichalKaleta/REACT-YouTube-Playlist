import Redux from 'redux' ;

import {ADD_TO_PLAYLIST} from '../actions';
import {REMOVE_FROM_PLAYLIST} from '../actions';
import { REARANGE_PLAYLIST } from '../actions'

export default function(state =[] ,action ){

  switch(action.type){

    case ADD_TO_PLAYLIST:  
      return state.concat(action.payload);

    case REMOVE_FROM_PLAYLIST:
  
      return [...state.slice(  0,action.payload  ), ...state.slice(action.payload+1,state.length)]
  
      case REARANGE_PLAYLIST:
        var dragIdx =action.payload.dragedIndex;
        var dropIdx =action.payload.dropIndex;
       if(dragIdx <= dropIdx  ){
        return  [ ...state.slice(0,dragIdx), ...state.slice(dragIdx+1,dropIdx+1), state[dragIdx] , ...state.slice(dropIdx+1,state.length+1) ]
       }else{
         return [ ...state.slice(0,dropIdx), state[dragIdx] , ...state.slice(dropIdx,dragIdx),  ...state.slice(dragIdx+1,state.length+1) ]
       }

      

    default:  
      return state;
  }

  
}



import Redux from 'redux';

import { REQUEST_NEXT_VIDEO } from '../actions';

export default  function(state = false,action){

    switch(action.type){
   
      case REQUEST_NEXT_VIDEO:
        
        return action.payload;

    default: 
       return state;
    }

}
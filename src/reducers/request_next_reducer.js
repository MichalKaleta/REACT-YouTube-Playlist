import Redux from 'redux';

import { REQUEST_NEXT_VIDEO } from '../actions';

export default  function(state =false,action){

    switch(action.type){
   
      case REQUEST_NEXT_VIDEO:
      console.log(action.payload);
        return action.payload;

    default: 
       return state;
    }

}
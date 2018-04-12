
var entersToLeaves = 0;
const methods ={
  enter: 'add',
  leave:'remove',
  end : 'remove'
}

export function dragAnimations(dragEvent,zIndex,itemOver,dragedIndex,index,len,activeIndex){
 
  if(dragedIndex < index){
    console.log(dragEvent)
    itemOver.style.zIndex = zIndex;
    if( index < len-1){
      itemOver.nextSibling.style.zIndex=0;
    }
    setTimeout(()=>{
      itemOver.classList[methods[dragEvent]]('slide-left');
      if(index < len-1){
        itemOver.nextSibling.classList[methods[dragEvent]]('slide-right');
      }
    },50)
      if(dragEvent === 'end' && index >= activeIndex && activeIndex > dragedIndex) return -1;
      else return 0;
      
  }else if(dragedIndex > index){
  
    itemOver.style.zIndex = zIndex;
    if( index > 0){
      itemOver.previousSibling.style.zIndex =0;
    }
  setTimeout(()=>{
    itemOver.classList[methods[dragEvent]]('slide-right');
    if( index > 0){
      itemOver.previousSibling.classList[methods[dragEvent]]('slide-left');
    }
  },50)
      if(dragEvent === 'end' && index <= activeIndex && activeIndex < dragedIndex) return 1;
      else return 0;
  }
}
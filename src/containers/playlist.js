import React,{ Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {playlistToPlayer} from '../actions/index'
import {removeFromPlaylist} from '../actions/index'
import {requestNextVideo} from '../actions/index'
import {rearangePlaylist} from '../actions/index'

class Playlist extends Component {
  constructor(){
    super()

    this.state ={ activeVideoIndex: 0  }
  }

  componentDidUpdate(){
   
    if(this.props.playlist.length ===1){
     
      var nextVideoId= this.props.playlist[this.state.activeVideoIndex].id;
      this.props.playlistToPlayer(nextVideoId);

    } 
    if(this.props.videoIsRequested===true){

        this.pushVideo(this.state.activeVideoIndex+1)
        this.props.requestNextVideo(false); 
    }
  }
pushVideo(index){

  var nextVideoId= this.props.playlist[index].id;
  this.setState({activeVideoIndex: index})
  this.props.playlistToPlayer(nextVideoId);   
}

 onButtonClick(direction){
   
   var step = direction==='next'? 1 : -1; 
   var index = this.state.activeVideoIndex + step ;
   this.pushVideo(index);
 }

onPlaylistItemClick(index){

 this.pushVideo(index);
}

onPlaylistItemDrag(ev,index){
  console.log(index)
  ev.dataTransfer.setData("text",index);
  
 }

onPlaylistItemDrop(ev,index){
  ev.preventDefault()
    
    var  dragedIndex = ev.dataTransfer.getData('text')
         dragedIndex =parseInt(dragedIndex)
    this.props.rearangePlaylist(dragedIndex,index)
  
}

onRemoveClick(index){
  this.props.removeFromPlaylist(index)
}


  renderPlaylistItem(video,index){
    
    var activeClass= index === this.state.activeVideoIndex ? 'video-active' : null;

    return (  
               <li key= {index}
                  draggable='true'
                  id='playlist-list-item'
                  className= {'d-inline-block ' + activeClass }  
                  video_id= {video.id}
                  onClick={ ()=> this.onPlaylistItemClick(index) }
                  onDragStart={ (ev)=> this.onPlaylistItemDrag(ev,index) }
                  onDragOver={(ev)=>{ev.preventDefault()}}
                  onDrop ={(ev)=>{ ev.preventDefault();
                                  this.onPlaylistItemDrop(ev,index)}}
                   > 
                   <a className="btn btn-danger delete-button"
                        onClick={   (ev)=>{ ev.stopPropagation();
                                            this.onRemoveClick(index)  
                                } }>
                     <i className="fa fa-times" ></i>
                  </a>
        
                  
                   <a > <img src ={video.thumb}  /></a>  
              </li>
            )
  }

  render(){
    return(
      <div>
        <div className='row'>
          <div className="col">
            <button id ='button-prev' className='btn btn-default float-left'
                  onClick={ () => this.onButtonClick('prev')  }           
                >PREV
            </button>
            <button id ='button-next' className='btn btn-default float-right'
                    onClick={ () => this.onButtonClick('next')  }           
                >NEXT
            </button>
          </div>
        </div>
        <ul> { 
                  this.props.playlist.map( (video,index) => {
                  return  this.renderPlaylistItem(video,index)
                })
        }</ul>
      </div>
    )
  }
}





function mapStateToProps(state){
     return {
            playlist :        state.playlist,
            videoIsRequested: state.requestNextVideo
          } ;
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
                               playlistToPlayer,
                               removeFromPlaylist,
                               rearangePlaylist,
                               requestNextVideo
                              }, dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(Playlist)

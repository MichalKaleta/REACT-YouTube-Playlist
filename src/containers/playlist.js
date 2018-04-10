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

    ev.currentTarget.classList.add('dragged');
    ev.dataTransfer.setData("text",index);
  }

  onItemDragEneter(ev){

    ev.stopPropagation()
    const itemOver = ev.currentTarget;
    if(!ev.currentTarget.classList.contains('dragged')){    
       
      itemOver.nextSibling.classList.add('slide-right');
      itemOver.classList.add('slide-left');
   
    }
  }

  onItemDragLeave(ev){

    ev.stopPropagation()
    const itemLeaved = ev.currentTarget;
    if(!ev.currentTarget.classList.contains('dragged')){
      
      itemLeaved.nextSibling.classList.remove('slide-right');
      itemLeaved.classList.remove('slide-left');
    }
  }

  onItemDragEnd(ev){
 
    ev.currentTarget.classList.remove('dragged');
  }

  onPlaylistItemDrop(ev,index){
    ev.preventDefault()
    const itemOver = ev.currentTarget;
       itemOver.nextSibling.classList.remove('slide-right')
      itemOver.classList.remove('slide-left');
      var dragedIndex = parseInt(ev.dataTransfer.getData('text'))
      this.props.rearangePlaylist(dragedIndex,index) 
  }

  onRemoveClick(ev,index){
    ev.stopPropagation();

    this.props.removeFromPlaylist(index)
  }

  renderPlaylistItem(video,index){
    
    var activeClass= index === this.state.activeVideoIndex ? 'video-active' : '';

    return (  
      <li key= {index}
        style= { { backgroundImage: 'url(' + video.thumb + ')' }}
        draggable='true'
        className= {'d-inline-block playlist-item ' + activeClass  }  
        video_id= {video.id}
        onClick={ ()=> this.onPlaylistItemClick(index) }
        onDragStart={ ev=> this.onPlaylistItemDrag(ev,index) }
        onDragOver={ ev=>{ ev.preventDefault(ev)} }
        onDragEnter ={ ev=>{this.onItemDragEneter(ev)}}
        onDragLeave ={ ev=>{this.onItemDragLeave(ev)}}
        onDrop ={ ev=>{ this.onPlaylistItemDrop(ev,index)}}
        onDragEnd={ ev => {this.onItemDragEnd(ev)} }
          > 
          <button className="btn btn-danger delete-button"
              onClick={  ev=>{ this.onRemoveClick(ev,index)  } }>
            <i className="fa fa-times" ></i>
        </button>
      </li>
    )
  }
  render(){
    return(
        <div className='col playlist-container'>
        {
           /*  <div className='row'>
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
        </div> */
        }
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

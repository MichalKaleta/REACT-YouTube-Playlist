import React,{ Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {playlistToPlayer} from '../actions/index'
import {removeFromPlaylist} from '../actions/index'
import {requestNextVideo} from '../actions/index'
import {rearangePlaylist} from '../actions/index'
import {dragAnimations} from '../components/dragAnimations'

class Playlist extends Component {
  constructor(){
    super()
    this.state ={ 
                  activeVideoIndex: 0,
                  draggedIndex: 0
                }
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

    if(index< this.props.playlist.length){
      
      var nextVideoId= this.props.playlist[index].id;
      this.setState({activeVideoIndex: index}) 
      this.props.playlistToPlayer(nextVideoId);  
    
    }else{
      this.props.playlistToPlayer('stop');
    }
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
    this.setState({draggedIndex: index})
    ev.dataTransfer.setData("text/plain",index);
  }

  onItemDragEneter(ev,index,len){
     
    ev.stopPropagation();
    const itemOver = ev.currentTarget;
    const dragedIndex = ev.dataTransfer.getData('text/plain')
    dragAnimations('enter',1000,itemOver,this.state.draggedIndex ,index,len,this.state.activeVideoIndex)
  }

  onItemDragLeave(ev,index,len){

    ev.stopPropagation()
    const itemOver = ev.currentTarget;
    const dragedIndex = ev.dataTransfer.getData('text/plain');
    dragAnimations('leave',0,itemOver,this.state.draggedIndex ,index,len)
  }

  onItemDragEnd(ev){
    
    ev.currentTarget.classList.remove('dragged')   
  }

  onPlaylistItemDrop(ev,index,len){

    ev.preventDefault()
    const dragedIndex = ev.dataTransfer.getData('text');
    const itemOver = ev.currentTarget;
    const step= dragAnimations('end',0,itemOver,this.state.draggedIndex ,index,len,this.state.activeVideoIndex);
    this.setState({activeVideoIndex: this.state.activeVideoIndex+step});
    this.props.rearangePlaylist(parseInt(dragedIndex,10),index) ; 
  }

  onRemoveClick(ev,index){

    ev.stopPropagation();
    this.props.removeFromPlaylist(index)
  }

  renderPlaylistItem(video,index,len){
    
    const activeClass= index === this.state.activeVideoIndex ? 'video-active' : '';
    return (  
      <li key= {index}
        style= { { backgroundImage: 'url(' + video.thumb + ')' }}
        draggable= 'true'
        className= {'d-inline-block playlist-item ' + activeClass  }  
        video_id= {video.id}
        onClick=     { ()=> this.onPlaylistItemClick(index) }
        onDragStart= { ev=> this.onPlaylistItemDrag(ev,index) }
        onDragOver=  { ev=>{ ev.preventDefault(ev)} }
        onDragEnter ={ ev=>{this.onItemDragEneter(ev,index,len)}}
        onDragLeave ={ ev=>{this.onItemDragLeave(ev,index,len)}}
        onDrop =     { ev=>{ this.onPlaylistItemDrop(ev,index,len)}}
        onDragEnd=   { ev => {this.onItemDragEnd(ev)} }
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
          <ul>   
             <ReactCSSTransitionGroup
                transitionName="slide"
                transitionEnterTimeout={0}
                transitionLeaveTimeout={0}>
                { 
                  this.props.playlist.map( (video,index,pl) => {
                    return this.renderPlaylistItem(video,index,pl.length)
                  })
                }
            </ReactCSSTransitionGroup>
          </ul>
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

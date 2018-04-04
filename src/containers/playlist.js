import React,{ Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {playlistToPlayer} from '../actions/index'
import {removeFromPlaylist} from '../actions/index'
import {requestNextVideo} from '../actions/index'

class Playlist extends Component {

  componentDidUpdate(){
   
    var nextVideoId= this.props.playlist[0].id;
   
    if(this.props.videoIsRequested===true){
      console.log(nextVideoId)
        this.props.playlistToPlayer(nextVideoId);   
        this.props.removeFromPlaylist();
        this.props.requestNextVideo(false); 
      
    }
  }

  renderPlaylistItem(video){
    
    return (  
              <li key= {video.etag}
                  className="d-inline" 
                  video_id= {video.id }
                   > 
                <img src ={video.thumb} />
              </li>  
            )
  }

  render(){
    return(
      <ul> 
              { 
                this.props.playlist.map( video => {
                return  this.renderPlaylistItem(video)
              })
      }</ul>
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
                               requestNextVideo
                              }, dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(Playlist)

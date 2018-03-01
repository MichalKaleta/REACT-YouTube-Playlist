import React,{ Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {playlistToPlayer} from '../actions/index'

class Playlist extends Component {

  passIdArray(videos){

      var videosIDs = videos.map(vid=>vid.id)
    
       this.props.playlistToPlayer(videosIDs)
    
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
              { this.passIdArray.call(this,this.props.playlist) }
              { 
                this.props.playlist.map( video => {
                return  this.renderPlaylistItem(video)
              })
      }</ul>
    )
  }
}

function mapStateToProps(state){
     return {playlist : state.playlist} ;
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({playlistToPlayer},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Playlist)

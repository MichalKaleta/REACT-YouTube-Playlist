import React,{ Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
 
import { addToPlaylist } from '../actions/index';

class VideoList extends Component{

  showVideoList(video){

    const id =video.id.videoId;
    const etag =video.etag
    const thumb =video.snippet.thumbnails.default.url;
    return ( <div className="d-inline"
                  key = {etag} 
                  onClick ={ this.onVideoClick.bind( this,{ id, etag, thumb } ) }>
              <img className='thumbnails'  src={thumb} /> 
            </div>) 
  }

  onVideoClick(videoData){
   this.props.addToPlaylist(videoData)
  }

  render(){
    return(
      <div >{ 
              this.props.videos.map( (video) =>{
                return  this.showVideoList( video )  })
      }</div>
    )
  }
}

function mapStateToProps(state){
    return { videos: state.videoList  }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({ addToPlaylist },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(VideoList)
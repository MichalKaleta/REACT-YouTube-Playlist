import React,{ Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {playVideo} from '../actions/index';

class VideoList extends Component{

  showVideoList(video){

    const id =video.id.videoId;
    const etag =video.etag
    const thumb =video.snippet.thumbnails.default.url;
    return ( <li key = {id} 
                      onClick ={this.onVideoClick.bind(this,id) }>
                    <img src={thumb} /> 
                  </li>) 
  }

  onVideoClick(id){

   this.props.playVideo(id)
  }

  render(){
    return(
      <div>
        <h3> Video List: </h3>
          <ul>
            { 
              this.props.videos.map( (video) =>{
                return  this.showVideoList( video)  })
            }
          </ul>
      </div>
    )
  }
}

function mapStateToProps(state){
    return { videos: state.videoList  }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({playVideo},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(VideoList)
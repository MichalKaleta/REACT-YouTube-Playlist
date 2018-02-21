import React,{ Component } from 'react';
import {connect} from 'react-redux';

class VideoList extends Component{

  showVideoList(video){
     const videoThumb =video.thumbnails.default.url;
     return (<li onClick ={this.onVideoClick() }>
                <img src={videoThumb} /> 
             </li>)
  }

  onVideoClick(){
    
  }

  render(){
    return(
      <div>
      <h3> Video List: </h3>
        <ul>
          {
            this.props.videos.map( (video)=>{
            return this.showVideoList(video.snippet)} )
            }
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state){
  
  return { videos: state.videoList  }
}

export default connect(mapStateToProps)(VideoList)
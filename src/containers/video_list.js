import React,{ Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {playVideo} from '../actions/index';

class VideoList extends Component{
  


  componentDidUpdate(){
    console.log("upfate")
  }

  showVideoList(){
    if(this.props.videos[1]){
      console.log(this.props.videos[1])
      return this.props.videos.map( (video) =>
    
      {
        const id =video.id.videoId;
        const videoThumb =video.snippet.thumbnails.default.url;
        return ( <li key = {id} 
                      onClick ={this.onVideoClick.bind(this,id) }>
                    <img src={videoThumb} /> 
                  </li>)
       })
      }
  }

  onVideoClick(id){
   console.log(id)
   this.props.playVideo(id)
  }

  render(){
    return(
      <div>
        <h3> Video List: </h3>
          <ul>
            { 
              this.showVideoList()
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
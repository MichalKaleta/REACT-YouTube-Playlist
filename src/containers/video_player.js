import React, {Component} from 'react';
import { connect } from 'react-redux';
import  YouTubeApi from '../components/yt_api'

class VideoPlayer extends Component {

  render(){

    return(
        <div>
            <YouTubeApi/>
        </div>
    )
  }
}

function mapStateToProps(state){

  return {videoId : state.activeVideo}
}
export default connect(mapStateToProps)(VideoPlayer)
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import YouTube from 'react-youtube'

import {requestNextVideo} from '../actions/index'

class VideoPlayer extends Component {
 
  render() {
    const opts = {
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };

    return (
      <YouTube
        opts={opts}
        onReady={this.onReady}
        onEnd={this.onEnd.bind(this)}
      />
    );
  }

  onReady(event) {
    event.target.loadVideoById('90U_SmKyfGI')
  }

  onEnd(event){
    this.props.requestNextVideo(true)
    event.target.loadVideoById(this.props.videoId)
   
  }
}


function mapStateToProps(state){
  return { videoId : state.nextVideo}
}
function mapDispatchTo(dispatch){
  return bindActionCreators({requestNextVideo},dispatch)
}
export default connect(mapStateToProps,mapDispatchTo)(VideoPlayer)





/* <YouTube
  videoId={string}                  // defaults -> null
  id={string}                       // defaults -> null
  className={string}                // defaults -> null
  opts={obj}                        // defaults -> {}
  onReady={func}                    // defaults -> noop
  onPlay={func}                     // defaults -> noop
  onPause={func}                    // defaults -> noop
  onEnd={func}                      // defaults -> noop
  onError={func}                    // defaults -> noop
  onStateChange={func}              // defaults -> noop
  onPlaybackRateChange={func}       // defaults -> noop
  onPlaybackQualityChange={func}    // defaults -> noop
/> */
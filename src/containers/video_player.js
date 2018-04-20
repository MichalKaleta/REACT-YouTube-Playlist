import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import YouTube from 'react-youtube'

import {requestNextVideo} from '../actions/index'
var player;
class VideoPlayer extends Component {

constructor(props){
  super(props)
  this.props.player;
}

 componentDidUpdate(){
  
    //player.setAttribute('videoId',this.props.videoId)
 
 }

  render() {
    const opts = {
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay:1
      }
    };

    return (
      <div className="embed-responsive embed-responsive-16by9">
        {console.log(this.props.videoId)}
        <YouTube
          videoId={ this.props.videoId }
          opts={opts}
          onReady={this.onReady.bind(this)}
          onEnd={this.onEnd.bind(this)}
        />
      </div>
    );
  }

  onReady(event) {
   //this.state.player =event.target
   //console.log(this.state.player)
  }

  onEnd(event){
    this.props.requestNextVideo(true)
    if (this.props.videoId =='stop'){
      event.target.loadVideoById('stop')
    }else{
    event.target.loadVideoById(this.props.videoId)  
    }
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
import React ,{Component} from 'react';
import {connect } from 'react-redux';
import {bindActionCreators} from 'redux'

import {requestNextVideo} from '../actions/index'

class YouTubeApi extends Component {

  constructor(props) {
    super(props);
    this.init();
    this.video = '1cH2cerUpMQ' //video id
    
    window['onYouTubeIframeAPIReady'] = (e) => {
      this.YT = window['YT'];
      this.reframed = false;
      this.player = new window['YT'].Player('player', {
        videoId: this.video,
        allow: 'autoplay',
        events: {
          'onStateChange': this.onPlayerStateChange.bind(this),
          'onError': this.onPlayerError.bind(this),
          'onReady': (e) => {
            if (!this.reframed) {
              this.reframed = true;
              reframe(e.target.a);
            }
          }
        }
      });
    };
  }


  render() {
    return ( 
       <div className="embed-responsive embed-responsive-16by9" id="player"></div>
    );
  }
  init() {
    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    //console.log(firstScriptTag)
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  onPlayerStateChange(event) {

      switch (event.data) {
        case window['YT'].PlayerState.ENDED:
         this.props.requestNextVideo(true)
         this.player.loadVideoById(this.props.videoInQueue)
         this.props.requestNextVideo(false)
         };
  };
  //utility
  cleanTime() {
    return Math.round(this.player.getCurrentTime())
  };
  onPlayerError(event) {
    switch (event.data) {
      case 2:
        //console.log('' + this.video)
        break;
      case 100:
        break;
      case 101 || 150:
        break;
    };
  };
}

 function mapStateToProps(state){

  return  {videoInQueue:  state.videosQueue}  
}

function mapDispatchToProps(dispatch){

  return   bindActionCreators({requestNextVideo},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(YouTubeApi)
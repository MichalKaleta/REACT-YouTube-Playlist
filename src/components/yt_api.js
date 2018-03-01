import React ,{Component} from 'react';
import {connect } from 'react-redux';


 class YouTubeApi extends Component {

  componentDidUpdate(){
   
  }


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
   //console.log(event)
          switch (event.data) {
           /*  case window['YT'].PlayerState.PLAYING:
             // if (this.cleanTime() == 0) {
               // console.log('started ' + this.cleanTime());
              //} else {
               // console.log('playing ' + this.cleanTime())
             // };
             // break;
            case window['YT'].PlayerState.PAUSED:
             // if (this.player.getDuration() - this.player.getCurrentTime() != 0) {
                //console.log('paused' + ' @ ' + this.cleanTime());
              //};
              //break; */
            case window['YT'].PlayerState.ENDED:
               
                //this.props.videosQueue.shift()
                this.player.loadPlaylist(this.props.videosQueue)
                
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

  return  {videosQueue:  state.videosQueue}  
}

export default connect(mapStateToProps)(YouTubeApi)
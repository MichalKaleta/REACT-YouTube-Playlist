import React, {Component} from 'react';
import { connect } from 'react-redux';

class VideoPlayer extends Component {

  render(){
    return(
      <iframe width="520" height="315"
      src={'https://www.youtube.com/embed/'+this.props.videoId}>
</iframe> 
    )
  }
}

function mapStateToProps(state){

  return {videoId : state.activeVideo}
}
export default connect(mapStateToProps)(VideoPlayer)
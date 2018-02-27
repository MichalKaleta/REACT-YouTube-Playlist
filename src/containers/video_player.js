import React, {Component} from 'react';
import { connect } from 'react-redux';

class VideoPlayer extends Component {

  render(){
    return(
        <iframe className='embed-responsive-item'
                src={'https://www.youtube.com/embed/'+this.props.videoId}>
        </iframe> 
    )
  }
}

function mapStateToProps(state){

  return {videoId : state.activeVideo}
}
export default connect(mapStateToProps)(VideoPlayer)
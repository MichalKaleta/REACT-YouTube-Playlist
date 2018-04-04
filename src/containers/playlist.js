import React,{ Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {playlistToPlayer} from '../actions/index'
import {removeFromPlaylist} from '../actions/index'
import {requestNextVideo} from '../actions/index'

class Playlist extends Component {
  constructor(){
    super()

    this.state ={ activeVideoIndex: 0  }
  }

  componentDidUpdate(){
   
    if(this.props.playlist.length ===1){
     
      var nextVideoId= this.props.playlist[this.state.activeVideoIndex].id;
      this.props.playlistToPlayer(nextVideoId);
      ////////////???????????????????????????????/////////////
    } 
    if(this.props.videoIsRequested===true){
      this.setState({activeVideoIndex : this.state.activeVideoIndex +1 })
      var nextVideoId= this.props.playlist[this.state.activeVideoIndex].id;
        this.props.playlistToPlayer(nextVideoId);   
       // this.props.removeFromPlaylist();
       
        this.props.requestNextVideo(false); 

    }
  }

 onNextButtonClick(){
 
   this.setState({activeVideoIndex: this.state.activeVideoIndex+1})
   var nextVideoId= this.props.playlist[this.state.activeVideoIndex+1].id;
   this.props.playlistToPlayer(nextVideoId);   

 }

  renderPlaylistItem(video,index){
    var activeClass='' ;
    if (index === this.state.activeVideoIndex){

        activeClass ='video-active';
    }else{ activeClass ='' }


    return (  
              <li key= {video.etag}
                  className= 'd-inline'  
                  video_id= {video.id }
                   > 
                <img src ={video.thumb}  className= { activeClass }  />
              </li>  
            )
  }

  render(){
    return(
      <div>
      <div>
        <button id ='next' className='btn btn-primary'
                onClick={ () => this.onNextButtonClick()  }           
            >NEXT
        </button>
      </div>
      <ul> 
              { 
                this.props.playlist.map( (video,index) => {
                return  this.renderPlaylistItem(video,index)
              })
      }</ul>
      </div>
    )
  }
}





function mapStateToProps(state){
     return {
            playlist :        state.playlist,
            videoIsRequested: state.requestNextVideo
          } ;
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
                               playlistToPlayer,
                               removeFromPlaylist,
                               requestNextVideo
                              }, dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(Playlist)

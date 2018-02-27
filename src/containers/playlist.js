import React,{ Component } from 'react';
import {connect} from 'react-redux';
/* import {bindActionCreators} from 'redux'; */

class Playlist extends Component{

  renderPlaylistItem(item){
   
    return (  <li key= {item.etag}
                  className="d-inline" 
                  videoId= {item.id  }
                   > 
                <img src ={item.thumb} />
              </li>   )
  }

  render(){
    return(
      <ul> { 
          this.props.playlist.map( item => {
           return  this.renderPlaylistItem(item)
        })
        }</ul>
    )
  }
}
function mapStateToProps(state){
     return {playlist : state.playlist} ;
}

export default connect(mapStateToProps)(Playlist)
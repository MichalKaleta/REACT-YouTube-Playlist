import React, { Component } from 'react';

import SearchBar from '../containers/search_bar';
import VideoList from '../containers/video_list'
import VideoPlayer from '../containers/video_player';
import Playlist from '../containers/playlist';

export default class App extends Component {

  render() {
   
    return (
        <div className='row'>   
          <div className="col-md-8">
            <div className="row">
              <div className="col">
                <VideoPlayer/>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Playlist/>
              </div>
            </div>
          </div>          
          <div className="col-md-4">
            <SearchBar/>
            <VideoList/>
          </div>
      
        </div>
        

    );
  }
}

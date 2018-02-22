import React, { Component } from 'react';

import SearchBar from '../containers/search_bar';
import VideoList from '../containers/video_list'
import VideoPlayer from '../containers/video_player';

export default class App extends Component {

  render() {
    return (
      <div>
        <VideoPlayer/>
        <SearchBar/>
        <VideoList/>
      </div>
    );
  }
}

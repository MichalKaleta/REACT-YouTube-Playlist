import axios from 'axios';

const KEY = 'AIzaSyD9d25lAYVOHhUtkUV5sKfTEmu25YQCRzo';
const URL ='https://www.googleapis.com/youtube/v3/search';

export const FETCH_VIDEOS ='FETCH_VIDEOS';
export const PLAY_VIDEO ='PLAY_VIDEO'
export const ADD_TO_PLAYLIST ='ADD_TO_PLAYLIST'

export function fetchVideos(query){
 
  const request =axios.get(URL,{params: {
    'key':KEY, 'maxResults': '10', 'part': 'snippet', 'q': query, 'type': ''}
  }).then( response => response.data.items)
  console.log(request)
  return {
    type: FETCH_VIDEOS,
    payload:  request
  }
} 

export function playVideo(id){

  return {
    type: PLAY_VIDEO,
    payload: id
  }
}

export function addToPlaylist(videoData){
  
  return {
      type: ADD_TO_PLAYLIST,
      payload: videoData
  }
}
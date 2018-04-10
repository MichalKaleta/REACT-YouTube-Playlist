import axios from 'axios';

const KEY = 'AIzaSyD9d25lAYVOHhUtkUV5sKfTEmu25YQCRzo';
const URL ='https://www.googleapis.com/youtube/v3/search';

export const FETCH_VIDEOS ='FETCH_VIDEOS';
export const PLAY_VIDEO ='PLAY_VIDEO';
export const ADD_TO_PLAYLIST ='ADD_TO_PLAYLIST';
export const PLAYLIST_TO_PLAYER ='PLAYLIST_TO_PLAYER';
export const REQUEST_NEXT_VIDEO = 'REQUEST_NEXT_VIDEO';
export const REMOVE_FROM_PLAYLIST = 'REMOVE_FROM_PLAYLIST';
export const REARANGE_PLAYLIST = 'REARANGE_PLAYLIST';

export function fetchVideos(query){
 
  const request =axios.get(URL,{params: {
    'key':KEY, 'maxResults': '12', 'part': 'snippet', 'q': query, 'type': 'video'}
  }).then( response => response.data.items)
 
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
export function removeFromPlaylist(index){
 
  return {
      type: REMOVE_FROM_PLAYLIST,     
      payload: index
  }
}
export function rearangePlaylist(dragedIndex,dropIndex){
 
  return {
      type: REARANGE_PLAYLIST,     
      payload: {  
                  dragedIndex: dragedIndex ,
                  dropIndex: dropIndex  
                }
  }
}

export function playlistToPlayer(video){
  
    return {
       type: PLAYLIST_TO_PLAYER,
       payload: video
    }
}

export function requestNextVideo(bool){

    return {
      type: REQUEST_NEXT_VIDEO,
      payload: bool
    }
}
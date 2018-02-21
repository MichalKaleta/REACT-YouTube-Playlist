import axios from 'axios';

const KEY = 'AIzaSyD9d25lAYVOHhUtkUV5sKfTEmu25YQCRzo';
const URL ='https://www.googleapis.com/youtube/v3/search';

export const FETCH_VIDEOS ='FETCH_VIDEOS';

export function fetchVideos(query){
 
  const request =axios.get(URL,{params: {
    'key':KEY, 'maxResults': '25', 'part': 'snippet', 'q': query, 'type': ''}
  }).then( response => response.data.items)

  return {
    type: FETCH_VIDEOS,
    payload:  request
  }
} 
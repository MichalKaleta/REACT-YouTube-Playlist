import axios from 'axios';

const KEY = 'AIzaSyD9d25lAYVOHhUtkUV5sKfTEmu25YQCRzo';
const URL ='https://www.googleapis.com/youtube/v3/search';

export const FETCH_VIDEOS ='FETCH_VIDEOS';

export function fetchVideos(query){
  console.log("actio creatoor started")
  const request = axios.get(URL,{params: {
        'key':KEY,
        'maxResults': '25',
        'part': 'snippet',
        'q': "surfing",
        'type': ''}
      }).then(   response => console.log(response) )
        .catch(  error=> { console.log(error);}  )
  
    return {
      type: FETCH_VIDEOS,
      payload: request
    }
} 
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useRef, useState } from "react";
import video from "./mov_bbb.mp4"
import './Remote.css';

function Remote(){
  <script src="https://cdnjs.cloudflare.com/ajax/libs/shaka-player/4.0.0/shaka-player.compiled.js"></script>
  let currentSession;
  let currentMediaSession;
  let currentVideoIndex = 0;
  let currentVideoUrl;
  let updateInterval;
  const defaultContentType = 'video/mp4';
  const seekSlider = document.getElementById('seekSlider');
  const currentTimeElement = document.getElementById('currentTime');
  const totalTimeElement = document.getElementById('totalTime');
  const applicationID = '3DDC41A0';
  const videoList = [
    'https://transfertco.ca/video/DBillPrelude.mp4',
    'https://transfertco.ca/video/DBillSpotted.mp4',
    'https://transfertco.ca/video/usa23_7_02.mp4'
    // Add more video URLs as needed
  ];

  const vid = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false); 
  const [isMute, setIsMute] = useState(false);  
  var v = document.getElementById("my-vid");


  function loadMedia(videoUrl) {
    currentVideoUrl = videoUrl;
    const mediaInfo = new chrome.cast.media.MediaInfo(videoUrl, defaultContentType);
    const request = new chrome.cast.media.LoadRequest(mediaInfo);
    const remotePlayer = new cast.framework.RemotePlayer();
    const remotePlayerController = new cast.framework.RemotePlayerController(remotePlayer);

    currentSession.loadMedia(request, mediaSession => {
        console.log('Media chargé avec succès');
      }, onError);
  }

  

  function start(){
    if (isPlaying) {
      vid.current.pause();
      setIsPlaying(false);
    } else {
      vid.current.play();
      setIsPlaying(true);
    }
  }

  function mute(){
    if(isMute){
      vid.current.defaultMuted = false;
      vid.current.muted = false;
      setIsMute(false);

    }
    else{
      vid.current.defaultMuted = true;
      vid.current.muted = true;
      setIsMute(true);
    }
  }

  function increaseVolume() {

   if(isMute){
    vid.current.defaultMuted = false;
    vid.current.muted =false;
    setIsMute(false);
   }
    
    var currentVolume = v.volume;
    var increment = 0.1;
    var newVolume = currentVolume + increment;
  
    // Ensure new volume is within [0, 1] and is finite
    if (!isFinite(newVolume) || newVolume < 0) {
      newVolume = 0; // Ensure volume is not less than 0
    } else if (newVolume > 1) {
      newVolume = 1; // Ensure volume does not exceed 1
    }
  
    // Set the volume to the new value
    v.volume = newVolume;
    }

  function decreaseVolume(){

    if(isMute){
      vid.current.defaultMuted = false;
      vid.current.muted =false;
      setIsMute(false);
     }


    var currentVolume = v.volume;
    var increment = 0.1;
    var newVolume = currentVolume - increment;
  
    // Ensure new volume is within [0, 1] and is finite
    if (!isFinite(newVolume) || newVolume < 0) {
      newVolume = 0; // Ensure volume is not less than 0
    } else if (newVolume > 1) {
      newVolume = 1; // Ensure volume does not exceed 1
    }
  
    // Set the volume to the new value
    v.volume = newVolume;
  }
    return(
      <div>
      <div className='video'>
        <video id="my-vid" src={video} type="video/mp4" controls ref={vid}></video>
        </div>
      <div className="box">
        
      <div className="top-row">
      <button className="power"><i className="fi fi-br-power"></i></button>
      </div>
      <div className='middle-row'>
        <div className='ok-inner'>
          <button className='edge-button top'></button>
          <button className='edge-button right'></button>
          <button className='edge-button bottom'></button>
          <button className='edge-button left'></button>

          <button className='ok-outer'></button>
        </div>
        
      </div>
      <div className='bottom-row'>
        <div className='box-buttons'>
          <div className='col1'>
          <button className='bt'><i className="fi fi-br-angle-small-left"></i></button>
          <button className='bt' onClick={start}><i className="fi fi-br-play-pause"></i></button>
          <button className='bt' onClick={mute}><i className="fi fi-br-volume-mute"></i></button>
          </div>
          <div className='col2'>
          <button className='bt'><i className="fi fi-br-screen"></i></button>
          <button  className='bt-four'>
          <i  onClick={increaseVolume} className="fi fi-br-plus"></i>
          <i  onClick={decreaseVolume} className="fi fi-br-minus"></i>
          </button>
          </div>
        </div>
      </div>
    </div>
    </div>
        )
    }


    export default Remote;

import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import video from './mov_bbb.mp4';
import { useEffect, useRef, useState } from "react";



function App() {


  const vid = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false); 
  const [isMute, setIsMute] = useState(false);  
  var v = document.getElementById("my-vid");

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
  


  return (
   
    

    
    <div className="App">
       
      <header className="App-header">
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
      
      </header>
    </div>
  );
}

export default App;

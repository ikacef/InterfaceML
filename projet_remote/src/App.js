import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import video from './mov_bbb.mp4';
import { useEffect, useRef, useState } from "react";



function App() {


  const vid = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false); 
  

  function start(){
    if (isPlaying) {
      vid.current.pause();
      setIsPlaying(false);
    } else {
      vid.current.play();
      setIsPlaying(true);
    }
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
              <button className='bt'><i className="fi fi-br-volume-mute"></i></button>
              </div>
              <div className='col2'>
              <button className='bt'><i className="fi fi-br-screen"></i></button>
              <button className='bt-four'>
              <i  className="fi fi-br-plus"></i>
              <i className="fi fi-br-minus"></i>
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

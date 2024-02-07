import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className='box'>
            <div className='top'>
              <button className='btn btn-dark'>prev</button>
              <button className='btn btn-dark'>play/pause</button>
              <button className='btn btn-dark'>next</button>
            </div>
            <div className='bottom'></div>
      </div>
    </div>
  );
}

export default App;

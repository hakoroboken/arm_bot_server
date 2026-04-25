import './App.css';
import StatusPanel from './StatusPanel';
// import ControlPanel from './ControlPanel';
// import RosConnection from './RosConnection';
import JoyInput from './JoyInput';
import WebSocket from './WebSocketConnection';

import { useState } from 'react';

function App() {
  const [joyInput, setJoyInput] = useState({lx:0, ly:0, rx:0})

  const {position, connected} = WebSocket(
    {controller_input : joyInput}
  );

  return (
    <div className="App">
      <header className="App-header">

        <StatusPanel position={position} connected={connected} />

        <JoyInput onChange={setJoyInput}/>

        {/* <ControlPanel publishPoint={publishPoint} /> */}

      </header>
    </div>
  );
}

export default App;
import React, { useState, useEffect, useRef } from 'react';

import Home from './components/Home';
import ToDo from './components/ToDo';

const App = () => {
  const [showPhoto, setShowPhoto] = useState(false);
  const [client_id] = useState(() => Math.floor(Math.random() * 1000)); 
  const [websocket, setWebSocket] = useState<WebSocket | null>(null);

  const audioFanfare = useRef<HTMLAudioElement>(null);
 
  useEffect(() => {   
    const connectWebSocket = () => {
      const ws = new WebSocket('ws://localhost:8000/ws');

      // Connect to Python API WebSocket
      ws.onopen = () => {
        const data = {message: 'Connected to React', client_id: client_id};
        const json = JSON.stringify(data);
        ws.send(json);
      };

      // Handle API broadcast
      ws.onmessage = (event) => {
        const response = JSON.parse(event.data);         
        if ('showPhoto' in response) {
          setShowPhoto(response.showPhoto);
          toggleFanfare();   
        } else {
          handleMessageBroadcast(response.message);
        }    
      };

      ws.onclose = () => {
        console.log(`WebSocket ${client_id} connection closed.`);
      };

      setWebSocket(ws);
    }

    connectWebSocket();

    return () => {
      if (websocket) {
        websocket.close();
      }
    };
  }, []); // Empty dependency array means this effect runs only once

  const sendMessage = () => {
    const message = prompt('Enter a message'); 
    if (message !== null && message !== '') {
      const data = {'message':message, 'client_id':client_id}
      const json = JSON.stringify(data);
      websocket!.send(json);
    }
  };
  
  const handleMessageBroadcast = (message: string) => {
    alert(message);
  };
  
  const togglePhoto = () => {
    const data = {"showPhoto": showPhoto};
    const json = JSON.stringify(data);
    websocket!.send(json); 
  }

  const renderPhoto = () => {
    return showPhoto ? <img src="https://easypaytestblobstorage.blob.core.windows.net/photos/8a03f7ef-db6b-4db6-ae7d-460a870ec88d.jpg" className={showPhoto ? 'animate nominee' : ''} /> : null
  }

  const toggleFanfare = () => {
    if (audioFanfare.current) {
      audioFanfare.current.play();
    }
  }

  return (
    <div id="app">
      <h2>#{client_id}</h2>
      {renderPhoto()}<br/>
      <button onClick={togglePhoto}>Toggle Photo</button>
      <button onClick={sendMessage}>Send a Message</button>
      <audio ref={audioFanfare} src="/src/assets/fanfare.wav" />
    </div>
  );
}

export default App;
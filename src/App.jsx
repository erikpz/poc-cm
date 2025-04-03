import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [message, setmessage] = useState(null);
  const [message2, setmessage2] = useState(null);

  const listenEvent = (event) => {
    if (event) {
      const eventStr = JSON.stringify(event.data);
      console.log("Received event.data from listener 'message'", eventStr);
      setmessage(event.data);
    }
  }
  
  useEffect(()  => {
    window.addEventListener('message', listenEvent);
    return () => {
      window.removeEventListener('message', listenEvent);
    }
  }, [])
  
  useEffect(() => {
    window.receiveMessageFromNative = (msg) => {
      console.log("Received from 'receiveMessageFromNative'", msg);
      setmessage2(msg);
    };
  }, []);

  return (
    <div>
      POC-CMW
      <h3>Message A: {message}</h3>
      <h3>Message B: {message2}</h3>
    </div>
  )
}

export default App

import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [message, setmessage] = useState(null);
  const [message2, setmessage2] = useState(null);
  const [message3, setmessage3] = useState(null);

  const listenEvent = (event) => {
    if (event) {
      const eventStr = JSON.stringify(event.data);
      console.log("Received event.data from listener 'message'--------", eventStr);
      setmessage(eventStr);
    }
  }

  const sendMessageToNative = () => {
    window.webkit.messageHandlers.nativeHandler.postMessage("Hola desde React");
  }

  const showMessageFromIOS = (msg) => {
    setmessage3(msg)
  }

  useEffect(() => {
    window.addEventListener('message', listenEvent);
    return () => {
      window.removeEventListener('message', listenEvent);
    }
  }, [])

  useEffect(() => {
    window.receiveMessageFromNative = (msg) => {
      console.log("Received from 'receiveMessageFromNative'=======", msg);
      setmessage2(msg);
    };
  }, []);

  useEffect(() => {
    document.addEventListener('DOMContentLoaded', function () {
      window.webkit.messageHandlers.iOSNative.postMessage({ action: "pause" });
    });
  }, []);

  return (
    <div>
      POC-CMW
      <h3>Message A (event.data from listener):</h3>
      <p>{message}</p>
      <h3>Message B (receiveMessageFromNative):</h3>
      <p>{message2}</p>
      <h3>From IOS: </h3>
      <p>{message3}</p>

      <button onClick={sendMessageToNative}>Enviar a App Nativa</button>
    </div>
  )
}

export default App

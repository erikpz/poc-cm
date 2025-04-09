import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [message, setmessage] = useState(null);
  const [message2, setmessage2] = useState(null);
  const [os, setos] = useState(null);

  const listenEvent = (event) => {
    if (event) {
      const eventStr = JSON.stringify(event.data);
      console.log("Received event.data from listener 'message'--------", eventStr);
      setmessage(eventStr);
    }
  }

  const sendMessageToNativeIos = () => {
    window.webkit.messageHandlers.nativeHandler.postMessage("Hola desde React");
  }
  const sendMessageToNativeAndroid = () => {
    Android.showAndroidToast("Hola desde la WebView");
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
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    setos(ua)
  }, []);

  return (
    <div>
      POC-CMW
      <h3>Message A (event.data from listener):</h3>
      <p>{message}</p>
      <h3>Message B (receiveMessageFromNative):</h3>
      <p>{message2}</p>
      <h3>OS: {os}</h3>

      <button onClick={sendMessageToNativeIos}>Enviar a App Nativa IOS</button>
      <button onClick={sendMessageToNativeAndroid}>Enviar a App Nativa ANDROID</button>
    </div>
  )
}

export default App

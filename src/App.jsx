import { useEffect, useState } from 'react'
import './App.css'

function App() {

  useEffect(()  => {
    window.addEventListener('message', (event) => {
      console.log("Received message", event.data.action);
      if (event.data.action === 'pause') {
          console.log("Pause");
      } else if (event.data.action === 'play') {
         console.log("Play");
      } else if (event.data.action === 'next') {
          console.log("Next");
      } else if (event.data.action === 'repeat') {
          console.log("Repeat");  
      }
  });
  }, [])

  return (
    <div>
      POC-CMW
    </div>
  )
}

export default App

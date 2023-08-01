import { useState } from 'react';
import './App.css'

/* function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <p>You have pressed the button {count} times</p>
      <button onClick={() => setCount(count +1)}>+</button><button onClick={() => setCount(count -1)}>-</button><button onClick={() => setCount(0)}>Reset</button>

    </>
  )
}

export default App

function App(props) {

  if (props.message.length > 10){
    return (
      <p>Too long</p>
    )
  }
  return (
    <>
      <p>{props.message}</p>
    </>
  )
}

export default App */

function App() {
  const [color, setColor] = useState('black');
  return (
    <>
      <p style={{color: color}}>Hello World</p>
      <button onClick={() => setColor("red")}>Change color</button>

    </>
  )
}

export default App

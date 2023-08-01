import { useState } from 'react';
import './App.css';

function App() {
  const [person, setPerson] = useState({firstname: '', lastname: '', email: '',phone:''});

  const inputChanged = (event) => {
    setPerson({...person, [event.target.name]: event.target.value});
  }

  const showAlert = () => {
    alert(`Hello ${person.firstname} ${person.lastname}`);
  }
  const formSubmitted = (event) => {
    event.preventDefault()
    if (person.email === "" || person.firstname === "" || person.lastname === "" || person.phone === ""){
      alert('All fields are required')
    } else {
      showAlert()
    }
  }
  
  return (
    <>
    <p>Name: {person.firstname} {person.lastname} Email: {person.email}</p>
    <form onSubmit={formSubmitted}>
      <input placeholder="First name" name="firstname" value={person.firstname} onChange={inputChanged}></input>
      <input placeholder="Last name" name="lastname" value={person.lastname} onChange={inputChanged}></input>
      <input placeholder="Email" name="email" value={person.email} onChange={inputChanged}></input>
      <input placeholder="Phone" name="phone" value={person.phone} onChange={inputChanged}></input>
      <input type="submit" value="Submit"></input>
    </form>
    </>
  );
}

export default App;
/* import { useState } from 'react'
import './App.css'

function App() {
const [number, setNumber] = useState({fnumber:'', snumber:''})
const [calc, setCalc] = useState('')

const inputChanged = (event) => {
  setNumber({...number, [event.target.name]: event.target.value})
}
const calculateSum =() => {
  setCalc([...calc, Number(number.fnumber) + Number(number.snumber)])
}
const calculateMin =() => {
  setCalc([...calc, Number(number.fnumber) - Number(number.snumber)])
}
  return (
    <>
      <p>Result: {calc}</p>
      <input placeholder='Give number' name="fnumber" value={number.fnumber} onChange={inputChanged}></input>
      <input placeholder='Give another number' name="snumber" value={number.snumber} onChange={inputChanged}></input>
      <button onClick={calculateSum}>+</button>
      <button onClick={calculateMin}>-</button>
    </>
  )
}

export default App */

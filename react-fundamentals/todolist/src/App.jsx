import TodoTable from './TodoTable'
import { useState } from 'react'
import './App.css'

function App() {
const [todo, setTodo] = useState({description: '', date: ''})
const [todos, setTodos] = useState([])
const inputChanged = (event) => {
  setTodo({...todo, [event.target.name]: event.target.value})
}
const addTodo = () => {
  setTodos([...todos,todo])
  setTodo({description: '', date:''})
}
const deleteTodo = (row) => {
  setTodos(todos.filter((todo,index) => index !== row))
}
  return (
    <>
      <input placeholder="Description" name="description" value={todo.description} onChange={inputChanged}></input>
      <input placeholder="Date" name="date" value={todo.date} onChange={inputChanged}></input>
      <button onClick={addTodo}>Submit</button>
      <TodoTable todos={todos} deleteTodo={deleteTodo}></TodoTable>
    </>
  )
}

export default App


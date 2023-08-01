import { useState } from 'react'

function Todolist() {
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
        <table>
            <tbody>
                {
                    todos.map((todo, index) =>
                    <tr key={index}>
                        <td>{todo.description}</td>
                        <td>{todo.date}</td>
                        <td><button onClick={() => props.deleteTodo(index)}>X</button></td>
                    </tr>)
                }
            </tbody>
        </table>
    </>
    )
    }
    
export default Todolist
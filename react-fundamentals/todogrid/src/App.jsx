import { useState } from 'react';
import './App.css';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';

function App() {
  const [todo, setTodo] = useState({description: '', date: '', status: ''});
  const [todos, setTodos] = useState([]);

  // Column definitions for ag-grid
  const columnDefs = [
    { field: 'description', sortable: true, filter: true, suppressMovable: true }, // task 1, suppress movement of columns
    { field: 'date', sortable: true, filter: true, suppressMovable: true }, // task 1
    { field: 'status', sortable: true, filter: true, suppressMovable: true } // task 1
   ]
  const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value});
  }

  const addTodo = () => {
    setTodos([...todos, todo]);
    setTodo({description: '', date: '', status: ''});
  }

  return (
    <>
      <input placeholder="Description" name="description" value={todo.description} onChange={inputChanged} />
      <input placeholder="Date" name="date" value={todo.date} onChange={inputChanged}/>
      <input placeholder="Status" name="status" value={todo.status} onChange={inputChanged}/>
      <AwesomeButton onPress={addTodo}>Add</AwesomeButton> 
      <div className="ag-theme-material" style={{height: 400, width: 600}}>
         <AgGridReact
            rowData={todos}
            columnDefs={columnDefs}
            animateRows={true} // task 2: animate rows
         />
      </div>
    </>
  );
}

export default App;
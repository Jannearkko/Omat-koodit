import { DataGrid } from '@mui/x-data-grid';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import { TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save'
import Button from '@mui/material/Button'
import { useState } from 'react';
import './App.css';

function App() {
  const [todo, setTodo] = useState({description: '', date: ''});
  const [todos, setTodos] = useState([]);

  const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value});
  }

  const addTodo = () => {
    setTodos([...todos, todo]);
  }

  const deleteTodo = (row) => {
    setTodos(todos.filter((todo, index) => index !== row));
  }
  const columns = [
    { field: 'description', headerName: 'Description', flex: 1 },
    { field: 'date', headerName: 'Date', flex: 1 },
    {
      field: 'delete',
      headerName: 'Delete',
      flex: 1,
      renderCell: (params) => (
        <Tooltip title="Delete todo">
          <IconButton size="small" color="error" onClick={() => deleteTodo(params.rowIndex)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  const rows = todos.map((todo, index) => ({
    id: index, // Add a unique identifier for each row
    ...todo,
  }));
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Todolist
          </Typography>
        </Toolbar>
      </AppBar>
      <Stack 
        direction="row" 
        spacing={2} 
        mt={2} 
        justifyContent="center"
        alignItems="center">
        <TextField 
          variant="standard"
          label="Description" 
          name="description" 
          value={todo.description}
          onChange={inputChanged} 
        />
        <TextField 
          variant="standard"
          label="Date"
          name="date"
          value={todo.date}
          onChange={inputChanged}
        />
        <Button
          variant="outlined"
          onClick={addTodo}><SaveIcon></SaveIcon> Add
        </Button>
      </Stack>
      <div style={{ height: 400, width: '100%', marginTop: '16px' }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} />
      </div>
    </>
  );
}

export default App;

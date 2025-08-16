import React, { useContext, useState } from 'react';
import { TodoContext } from '../context/TodoContext.tsx';
import TodoItem from './TodoItem.tsx';
import { TextField, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

const TodoList: React.FC = () => {
  const { todos, loading, error } = useContext(TodoContext);
  const [userFilter, setUserFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredTodos = todos.filter(todo => {
    return (
      (userFilter ? todo.user === userFilter : true) &&
      (statusFilter ? (statusFilter === 'completed' ? todo.completed : !todo.completed) : true)
    );
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box>
      <Box display="flex" gap={2} mb={2}>
        <TextField label="Filter by user" value={userFilter} onChange={e => setUserFilter(e.target.value)} />
        <FormControl>
          <InputLabel>Status</InputLabel>
          <Select value={statusFilter} label="Status" onChange={e => setStatusFilter(e.target.value)}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </Box>
  );
};

export default TodoList;

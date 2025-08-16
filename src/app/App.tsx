import React from 'react';
import { CssBaseline, Container, Typography } from '@mui/material';
import { TodoProvider } from '../context/TodoContext.tsx';
import TodoList from '../components/TodoList.tsx';
import './styles/app.css';

const App: React.FC = () => (
  <TodoProvider>
    <CssBaseline />
    <Container maxWidth="md">
      <Typography variant="h3" gutterBottom>ReactPOC: Todo List</Typography>
      <TodoList />
    </Container>
  </TodoProvider>
);

export default App;

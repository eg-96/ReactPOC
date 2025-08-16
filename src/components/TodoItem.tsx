import React from 'react';
import { Card, CardContent, Typography, Checkbox } from '@mui/material';
import { Todo } from '../context/TodoContext.tsx';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => (
  <Card sx={{ mb: 2 }}>
    <CardContent>
      <Typography variant="h6">{todo.title}</Typography>
      <Typography color="text.secondary">User: {todo.user}</Typography>
      <Checkbox checked={todo.completed} disabled />
      <Typography variant="body2" color={todo.completed ? 'primary' : 'error'}>
        {todo.completed ? 'Completed' : 'Pending'}
      </Typography>
    </CardContent>
  </Card>
);

export default TodoItem;

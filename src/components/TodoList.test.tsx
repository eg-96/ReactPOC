import React from 'react';
import { render, screen } from '@testing-library/react';
import { TodoProvider } from '../context/TodoContext';
import TodoList from './TodoList';

test('renders loading state', () => {
  render(
    <TodoProvider>
      <TodoList />
    </TodoProvider>
  );
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

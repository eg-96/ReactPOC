import { useMemo } from 'react';
import { useContext } from 'react';
import { TodoContext } from '../context/TodoContext.tsx';

/**
 * Custom hook to filter todos by user and completion status.
 * Demonstrates use of useMemo, context, and derived state.
 */
export function useFilteredTodos(userFilter: string, statusFilter: 'all' | 'completed' | 'pending') {
const { todos, loading, error } = useContext(TodoContext);

  // Memoize filtered todos for performance
  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      const userMatch = userFilter ? todo.user === userFilter : true;
      const statusMatch =
        statusFilter === 'all'
          ? true
          : statusFilter === 'completed'
          ? todo.completed
          : !todo.completed;
      return userMatch && statusMatch;
    });
  }, [todos, userFilter, statusFilter]);

  return { filteredTodos, loading, error };
}

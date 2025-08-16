import { createContext, useReducer, useEffect, ReactNode } from 'react';
import { fetchTodos } from '../services/todoService.ts';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  user: string;
}

interface State {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  todos: [],
  loading: true,
  error: null,
};

export const TodoContext = createContext<{
  todos: Todo[];
  loading: boolean;
  error: string | null;
}>({
  todos: [],
  loading: true,
  error: null,
});

function todoReducer(state: State, action: any): State {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return { ...state, todos: action.payload, loading: false };
    case 'FETCH_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    fetchTodos()
      .then(data => dispatch({ type: 'FETCH_SUCCESS', payload: data }))
      .catch(err => dispatch({ type: 'FETCH_ERROR', payload: err.message }));
  }, []);

  return (
    <TodoContext.Provider value={{ ...state }}>
      {children}
    </TodoContext.Provider>
  );
};

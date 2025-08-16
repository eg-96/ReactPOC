import { Todo } from '../context/TodoContext';

export type TodoAction =
  | { type: 'FETCH_SUCCESS'; payload: Todo[] }
  | { type: 'FETCH_ERROR'; payload: string };

export interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

export function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return { ...state, todos: action.payload, loading: false };
    case 'FETCH_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

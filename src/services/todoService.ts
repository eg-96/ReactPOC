import axios from 'axios';
import { Todo } from '../context/TodoContext';

export async function fetchTodos(): Promise<Todo[]> {
  const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=20');
  // Add a mock user for demo
  return response.data.map((todo: any) => ({
    ...todo,
    user: `user${(todo.userId % 3) + 1}`,
  }));
}

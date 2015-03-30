import setToString from '../../lib/settostring';
import {dispatch} from '../dispatcher';

export const MAX_TODO_TITLE_LENGTH = 42;

export function onNewTodoFieldChange({target: {name, value}}) {
  switch (name) {
    case 'title':
      value = value.slice(0, MAX_TODO_TITLE_LENGTH);
      break;
  }
  dispatch(onNewTodoFieldChange, {name, value});
}

export function addTodo(todo) {
  const title = todo.get('title').trim();
  if (!title) return;
  dispatch(addTodo, todo);
}

export function deleteTodo(todo) {
  dispatch(deleteTodo, todo);
}

export function clearAll() {
  dispatch(clearAll);
}

export function addHundredTodos() {
  dispatch(addHundredTodos);
}

// Override actions toString for logging.
setToString('todos', {
  onNewTodoFieldChange, addTodo, deleteTodo, clearAll, addHundredTodos
});

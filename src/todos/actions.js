import setToString from '../lib/settostring';
import {dispatch} from '../dispatcher';

export const MAX_TODO_TITLE_LENGTH = 42;

export function addHundredTodos() {
  dispatch(addHundredTodos);
}

export function addTodo(todo) {
  const title = todo.title.trim();
  if (!title) return;
  dispatch(addTodo, todo);
}

export function clearAll() {
  dispatch(clearAll);
}

export function deleteTodo(todo) {
  dispatch(deleteTodo, todo);
}

export function completeTodo(todo) {
  dispatch(completeTodo, todo);
}

export function onTodoFieldChange({id}, {target: {name, value}}) {
  switch (name) {
    case 'title':
      value = value.slice(0, MAX_TODO_TITLE_LENGTH);
      break;
  }
  dispatch(onTodoFieldChange, {id, name, value});
}

export function onTodoEndEditing(todo) {
  if (todo.title.length === 0)
    dispatch(deleteTodo, todo);
}

export function toggleTodoCompleted(todo) {
  dispatch(toggleTodoCompleted, todo);
}

export function clearCompletedTodos() {
  dispatch(clearCompletedTodos);
}

export function onNewTodoFieldChange({target: {name, value}}) {
  switch (name) {
    case 'title':
      value = value.slice(0, MAX_TODO_TITLE_LENGTH);
      break;
  }
  dispatch(onNewTodoFieldChange, {name, value});
}

setToString('todos', {
  addHundredTodos,
  addTodo,
  clearAll,
  clearCompletedTodos,
  deleteTodo,
  onTodoFieldChange,
  onNewTodoFieldChange,
  toggleTodoCompleted
});

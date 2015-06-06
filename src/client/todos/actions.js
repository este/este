import Promise from 'bluebird';
import setToString from '../../lib/settostring';
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

export function onEditableState(id, name, state) {
  dispatch(onEditableState, {id, name, state});
}

export function onNewTodoFieldChange({target: {name, value}}) {
  switch (name) {
    case 'title':
      value = value.slice(0, MAX_TODO_TITLE_LENGTH);
      break;
  }
  dispatch(onNewTodoFieldChange, {name, value});
}

export function saveTitle(id, title) {
  // Simulate async saving.
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({id, title});
    }, 500);
  });
  return dispatch(saveTitle, promise);
}

// Override toString methods. Pretty useful for dispatched actions monitoring.
setToString('todos', {
  addHundredTodos,
  addTodo,
  clearAll,
  deleteTodo,
  onEditableState,
  onNewTodoFieldChange,
  saveTitle
});

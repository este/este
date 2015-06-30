import Promise from 'bluebird';
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

export function onEditableSave(id, name, value) {
  // Simulate async saving.
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({id, name, value});
    }, 500);
  });
  return dispatch(onEditableSave, promise);
}

export function onEditableState(id, name, state) {
  if (state)
    state = state.set('value', state.value.slice(0, MAX_TODO_TITLE_LENGTH));
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

setToString('todos', {
  addHundredTodos,
  addTodo,
  clearAll,
  deleteTodo,
  onEditableSave,
  onEditableState,
  onNewTodoFieldChange
});

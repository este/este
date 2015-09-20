/**
 * Actions
 */

export const ADD_HUNDRED_TODOS = 'ADD_HUNDRED_TODOS';
export const ADD_TODO = 'ADD_TODO';
export const CLEAR_ALL_TODOS = 'CLEAR_ALL_TODOS';
export const DELETE_TODO = 'DELETE_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
export const ON_TODO_FIELD_CHANGE = 'ON_TODO_FIELD_CHANGE';
export const ON_TODO_END_EDITING = 'ON_TODO_END_EDITING';
export const TOGGLE_TODO_COMPLETED = 'TOGGLE_TODO_COMPLETED';
export const CLEAR_COMPLETED_TODOS = 'CLEAR_COMPLETED_TODOS';
export const ON_NEW_TODO_FIELD_CHANGE = 'ON_NEW_TODO_FIELD_CHANGE';

/**
 * Constans
 */

const MAX_TODO_TITLE_LENGTH = 42;

/**
 * Action creators
 */

export function addHundredTodos() {
  return {
    type: ADD_HUNDRED_TODOS
  };
};

export function addTodo(todo) {
  const title = todo.title.trim();
  return {
    type: ADD_TODO,
    payload: {title}
  };
};

export function clearAllTodos() {
  return {
    type: CLEAR_ALL_TODOS
  };
}

export function deleteTodo(todo) {
  return {
    type: DELETE_TODO,
    payload: {todo}
  };
}

export function completeTodo(todo) {
  return {
    type: COMPLETE_TODO,
    payload: {todo}
  };
}

export function onTodoFieldChange({id}, {target: {name, value}}) {
  switch (name) {
    case 'title':
      value = value.slice(0, MAX_TODO_TITLE_LENGTH);
      break;
  }

  return {
    type: ON_TODO_FIELD_CHANGE,
    payload: {id, name, value}
  };
}

export function onTodoEndEditing(todo) {
  if (todo.title.length === 0) return deleteTodo(todo);
  return {
    type: ON_TODO_END_EDITING,
    payload: {todo}
  };
}

export function toggleTodoCompleted(todo) {
  return {
    type: TOGGLE_TODO_COMPLETED,
    payload: {todo}
  };
};

export function clearCompletedTodos(todo) {
  return {
    type: CLEAR_COMPLETED_TODOS,
    payload: {todo}
  };
};

export function onNewTodoFieldChange({target: {name, value}}) {
  switch (name) {
    case 'title':
      value = value.slice(0, MAX_TODO_TITLE_LENGTH);
      break;
  }

  return {
    type: ON_NEW_TODO_FIELD_CHANGE,
    payload: {name, value}
  };
}

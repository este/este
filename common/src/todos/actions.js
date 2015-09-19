export const ADD_HUNDRED_TODOS = 'ADD_HUNDRED_TODOS';
export const ADD_TODO = 'ADD_TODO';
export const CLEAR_ALL = 'CLEAR_ALL';
export const DELETE_TODO = 'DELETE_TODO';
export const SET_NEW_TODO_FIELD = 'SET_NEW_TODO_FIELD';

const MAX_TODO_TITLE_LENGTH = 42;

export function setNewTodoField({target: {name, value}}) {
  switch (name) {
  case 'title':
    value = value.slice(0, MAX_TODO_TITLE_LENGTH); break;
  }
  return {
    type: SET_NEW_TODO_FIELD,
    payload: {name, value}
  };
}

export function addTodo(todo) {
  return {
    type: ADD_TODO,
    payload: {todo}
  };
};

export function deleteTodo(id) {
  return {
    type: DELETE_TODO,
    payload: {id}
  };
}

export function clearAll() {
  return {
    type: CLEAR_ALL
  };
}

export function addHundredTodos() {
  return {
    type: ADD_HUNDRED_TODOS
  };
}

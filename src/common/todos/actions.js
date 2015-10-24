export const ADD_HUNDRED_TODOS = 'ADD_HUNDRED_TODOS';
export const ADD_TODO = 'ADD_TODO';
export const CLEAR_ALL_COMPLETED_TODOS = 'CLEAR_ALL_COMPLETED_TODOS';
export const CLEAR_ALL_TODOS = 'CLEAR_ALL_TODOS';
export const DELETE_TODO = 'DELETE_TODO';
export const FETCH_USER_TODOS = 'FETCH_USER_TODOS';
export const FETCH_USER_TODOS_ERROR = 'FETCH_USER_TODOS_ERROR';
export const FETCH_USER_TODOS_SUCCESS = 'FETCH_USER_TODOS_SUCCESS';
export const ON_NEW_TODO_CHANGE = 'ON_NEW_TODO_CHANGE';
export const TOGGLE_TODO_COMPLETED = 'TOGGLE_TODO_COMPLETED';

const MAX_TODO_TITLE_LENGTH = 42;

export function addHundredTodos() {
  return {
    type: ADD_HUNDRED_TODOS
  };
}

export function addTodo(todo) {
  return {
    type: ADD_TODO,
    payload: {todo}
  };
};

export function clearAllCompletedTodos() {
  return {
    type: CLEAR_ALL_COMPLETED_TODOS
  };
}

export function clearAllTodos() {
  return {
    type: CLEAR_ALL_TODOS
  };
}

export function deleteTodo(id) {
  return {
    type: DELETE_TODO,
    payload: {id}
  };
}

export function fetchUserTodos({location, params}) {
  return ({fetch}) => ({
    type: [
      FETCH_USER_TODOS,
      FETCH_USER_TODOS_SUCCESS,
      FETCH_USER_TODOS_ERROR,
    ],
    payload: {
      // We can use location and params to create custom endpoint.
      promise: fetch('api/v1/todos/user')
        .then(response => response.json())
    }
  });
}

export function onNewTodoChange(name, value) {
  switch (name) {
    case 'title':
      value = value.slice(0, MAX_TODO_TITLE_LENGTH); break;
  }
  return {
    type: ON_NEW_TODO_CHANGE,
    payload: {name, value}
  };
}

export function toggleTodoCompleted(todo) {
  return {
    type: TOGGLE_TODO_COMPLETED,
    payload: {todo}
  };
};



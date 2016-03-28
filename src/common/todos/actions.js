import { Range } from 'immutable';

export const ADD_HUNDRED_TODOS = 'ADD_HUNDRED_TODOS';
export const ADD_TODO = 'ADD_TODO';
export const CLEAR_ALL_COMPLETED_TODOS = 'CLEAR_ALL_COMPLETED_TODOS';
export const CLEAR_ALL_TODOS = 'CLEAR_ALL_TODOS';
export const DELETE_TODO = 'DELETE_TODO';
export const TOGGLE_TODO_COMPLETED = 'TOGGLE_TODO_COMPLETED';

export function addHundredTodos() {
  // Note how dependency injection ensures pure action.
  return ({ getUid, now }) => {
    const payload = Range(0, 100).map(() => {
      const id = getUid();
      return {
        createdAt: now(),
        id,
        title: `Item #${id}`
      };
    }).toJS();
    return {
      type: ADD_HUNDRED_TODOS,
      payload
    };
  };
}

export function addTodo(title) {
  return ({ getUid, now }) => ({
    type: ADD_TODO,
    payload: {
      createdAt: now(),
      id: getUid(),
      title: title.trim()
    }
  });
}

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
    payload: { id }
  };
}

export function toggleTodoCompleted(todo) {
  return {
    type: TOGGLE_TODO_COMPLETED,
    payload: { todo }
  };
}

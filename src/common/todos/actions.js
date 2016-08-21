/* @flow weak */
import { Range } from 'immutable';

export const ADD_HUNDRED_TODOS = 'ADD_HUNDRED_TODOS';
export const ADD_TODO = 'ADD_TODO';
export const CLEAR_ALL_COMPLETED_TODOS = 'CLEAR_ALL_COMPLETED_TODOS';
export const CLEAR_ALL_TODOS = 'CLEAR_ALL_TODOS';
export const DELETE_TODO = 'DELETE_TODO';
export const TOGGLE_TODO_COMPLETED = 'TOGGLE_TODO_COMPLETED';

export const addHundredTodos = () => ({ getUid, now }) => {
  const payload = Range(0, 100).map(() => {
    const id = getUid();
    return {
      createdAt: now(),
      id,
      title: `Item #${id}`,
    };
  }).toJS();
  return {
    type: ADD_HUNDRED_TODOS,
    payload,
  };
};

export const addTodo = (title) => ({ getUid, now }) => ({
  type: ADD_TODO,
  payload: {
    createdAt: now(),
    id: getUid(),
    title: title.trim(),
  },
});

export const clearAllCompletedTodos = () => ({
  type: CLEAR_ALL_COMPLETED_TODOS,
});

export const clearAllTodos = () => ({
  type: CLEAR_ALL_TODOS,
});

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: { id },
});

export const toggleTodoCompleted = (todo) => ({
  type: TOGGLE_TODO_COMPLETED,
  payload: { todo },
});

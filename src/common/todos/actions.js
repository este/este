/* @flow */
import type { Action, Deps, Todo } from '../types';
import R from 'ramda';

export const addHundredTodos = () => ({ getUid, now }: Deps): Action => {
  const todos = R.range(0, 100).map(() => {
    const id = getUid();
    // Note how we can enforce shape with type annotation. This is a special
    // case because flowtype doesn't know Ramda. Nobody wrotes typedefs yet.
    // Atom editor can show flow uncovered code on click.
    const todo: Todo = {
      completed: false,
      createdAt: now(),
      id,
      title: `Item #${id}`,
    };
    return todo;
  });
  return {
    type: 'ADD_HUNDRED_TODOS',
    payload: { todos },
  };
};

export const addTodo = (title: string) => ({ getUid, now }: Deps): Action => ({
  type: 'ADD_TODO',
  payload: {
    todo: {
      completed: false,
      createdAt: now(),
      id: getUid(),
      title: title.trim(),
    },
  },
});

export const clearAllCompletedTodos = (): Action => ({
  type: 'CLEAR_ALL_COMPLETED_TODOS',
});

export const clearAllTodos = (): Action => ({
  type: 'CLEAR_ALL_TODOS',
});

export const deleteTodo = (id: string): Action => ({
  type: 'DELETE_TODO',
  payload: { id },
});

export const toggleTodoCompleted = (todo: Todo): Action => ({
  type: 'TOGGLE_TODO_COMPLETED',
  payload: { todo },
});

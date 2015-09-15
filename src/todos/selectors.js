import {createSelector} from 'reselect';

export const selectVisibleTodos = ({todos}) => ({
  visibleTodos: todos.list
});

export const selectLeftTodos = createSelector(
  selectVisibleTodos,
  ({visibleTodos}) => {
    const leftTodos = visibleTodos.filter(todo => !todo.completed);
    return {
      hasCompletedTodos: visibleTodos.size > leftTodos.size,
      leftTodos
    };
  }
);

export const selectNewTodo = ({todos}) => ({
  newTodo: todos.newTodo
});

import {createSelector} from 'reselect';

export const selectVisibleTodos = ({todos}) => ({
  visibleTodos: todos.list
});

export const selectLeftTodos = createSelector(
  selectVisibleTodos,
  ({visibleTodos}) => ({
    leftTodos: visibleTodos.filter(todo => !todo.completed)
  })
);

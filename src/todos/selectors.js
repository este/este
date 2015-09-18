import {createSelector} from 'reselect';

const todos = ({todos}) => todos.list;

export const selectTodos = createSelector(
  todos,
  list => list.filter(todo => !todo.completed)
);

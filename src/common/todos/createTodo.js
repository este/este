/* @flow weak */

const createTodo = json => ({
  completed: false,
  createdAt: null,
  id: '',
  title: '',
  ...json,
});

export default createTodo;

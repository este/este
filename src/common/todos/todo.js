import { Record } from 'immutable';

const Todo = Record({
  completed: false,
  createdAt: null,
  id: '',
  title: ''
});

export default Todo;

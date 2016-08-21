/* @flow */
import { Record } from '../transit';

const Todo = Record({
  completed: false,
  createdAt: null,
  id: '',
  title: '',
}, 'todo');

export default Todo;

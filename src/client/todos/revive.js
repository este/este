import Todo from './todo';
import {Map} from 'immutable';

export default function(value) {
  return Map(value)
    .set('newTodo', new Todo(value.get('newTodo')))
    .set('list', value.get('list').map(todo => new Todo(todo)));
}

import * as actions from './actions';
import {Range, Record} from 'immutable';
import {getRandomString} from '../../lib/getrandomstring';
import {newTodoCursor, todosCursor} from '../state';
import {register} from '../dispatcher';

// Isomorphic store has to be state-less.

const TodoItem = Record({
  id: '',
  title: ''
});

export const dispatchToken = register(({action, data}) => {

  switch (action) {
    case actions.onNewTodoFieldChange:
      newTodoCursor(todo => {
        // Use destructuring assignment. It's explicit.
        const {name, value} = data;
        return todo.set(name, value);
      });
      break;

    case actions.addTodo:
      todosCursor(todos => {
        const title = data.get('title');
        const todo = new TodoItem({
          id: getRandomString(),
          title: title
        }).toMap();
        return todos.push(todo);
      });
      // TODO: Use Record instead of Map.
      newTodoCursor(todo => new TodoItem().toMap());
      break;

    case actions.deleteTodo:
      todosCursor(todos => {
        const todo = data;
        // TODO: Use Map or OrderedMap.
        return todos.delete(todos.indexOf(todo));
      });
      break;

    case actions.clearAll:
      todosCursor(todos => todos.clear());
      break;

    case actions.addHundredTodos:
      todosCursor(todos => {
        return todos.withMutations(list => {
          Range(0, 100).forEach(i => {
            const id = getRandomString();
            list.push(new TodoItem({
              id: id,
              title: `Item #${id}`
            }).toMap());
          });
        });
      });
      break;
  }

});

export function getNewTodo() {
  return newTodoCursor();
}

export function getTodos() {
  return todosCursor();
}

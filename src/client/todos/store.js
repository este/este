import * as actions from './actions';
import TodoItem from './todoitem';
import {Range} from 'immutable';
import {getRandomString} from '../../lib/getrandomstring';
import {newTodoCursor, todosCursor} from '../state';
import {register} from '../dispatcher';

// Isomorphic store has to be state-less.

export const getNewTodo = () => newTodoCursor();
export const getTodos = () => todosCursor();

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
        const title = data.title;
        const todo = new TodoItem({
          id: getRandomString(),
          title: title
        });
        return todos.push(todo);
      });
      newTodoCursor(todo => new TodoItem());
      break;

    case actions.deleteTodo:
      todosCursor(todos => {
        const todo = data;
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
            }));
          });
        });
      });
      break;
  }

});

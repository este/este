import * as actions from './actions';
import Todo from './todo';
import {Range} from 'immutable';
import {getRandomString} from '../../lib/getrandomstring';
import {register} from '../dispatcher';
import {todosCursor} from '../state';

export const dispatchToken = register(({action, data}) => {

  switch (action) {
    case actions.onNewTodoFieldChange:
      todosCursor(todos => {
        const {name, value} = data;
        return todos.setIn(['newTodo', name], value);
      });
      break;

    case actions.addTodo:
      todosCursor(todos => {
        return todos
          .update('list', (list) => {
            const todo = new Todo({
              id: getRandomString(),
              title: data.title
            });
            return list.push(todo);
          })
          .set('newTodo', new Todo);
      });
      break;

    case actions.deleteTodo:
      todosCursor(todos => {
        const todo = data;
        return todos.update('list', list => list.delete(list.indexOf(todo)));
      });
      break;

    case actions.clearAll:
      todosCursor(todos => {
        return todos
          .update('list', list => list.clear())
          .set('newTodo', new Todo);
      });
      break;

    case actions.addHundredTodos:
      todosCursor(todos => {
        return todos.update('list', list => {
          return list.withMutations(list => {
            Range(0, 100).forEach(i => {
              const id = getRandomString();
              list.push(new Todo({
                id: id,
                title: `Item #${id}`
              }));
            });
          });
        });
      });
      break;
  }

});

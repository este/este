import {actions} from './actions';
import Todo from './todo';
import getRandomString from '../lib/getrandomstring';
import {Range, Record, List} from 'immutable';

const initialState = new Record({
  newTodo: new Record({
    title: ''
  }),
  list: List([])
});

const revive = state => {
  const list = state.get('list');
  return initialState.merge({
    newTodo: new Todo(state.get('newTodo')),
    list: list ? list.map(todo => new Todo(todo)) : List([])
  });
};

export default function todoStore(state = initialState, action, payload) {
  if (!action) return revive(state);

  switch (action) {

    case actions.addHundredTodos:
      return state.update('list', list => list.withMutations(list => {
        Range(0, 100).forEach(i => {
          const id = getRandomString();
          list.push(new Todo({
            id,
            title: `Item #${id}`
          }));
        });
      }));

    case actions.addTodo:
      return state
        .update('list', (list) => {
          const todo = payload;
          const newTodo = todo.merge({
            id: getRandomString()
          });
          return list.push(newTodo);
        })
        .set('newTodo', new Todo);

    case actions.clearAll:
      return state
        .update('list', list => list.clear())
        .set('newTodo', new Todo);

    case actions.deleteTodo: {
      const {id} = payload;
      return state.update('list', list => {
        const idx = list.findIndex(todo => todo.id === id);
        return list.delete(idx);
      });
    }

    case actions.onTodoFieldChange: {
      const {id, name, value} = payload;
      return state.update('list', list => {
        const idx = list.findIndex(todo => todo.id === id);
        return list
          .setIn([idx, name], value)
          .setIn([idx, 'completed'], false);
      });
    }

    case actions.onNewTodoFieldChange: {
      const {name, value} = payload;
      return state.setIn(['newTodo', name], value);
    }

    case actions.toggleTodoCompleted: {
      const {id} = payload;
      return state.update('list', list => {
        const idx = list.findIndex(todo => todo.id === id);
        return list
          .updateIn([idx, 'completed'], completed => !completed);
      });
    }

    case actions.clearCompletedTodos:
      return state.update('list', list => list.filter(todo => !todo.completed));

  }

  return state;
};

import * as actions from './actions';
import Todo from './Todo';
import getRandomString from '../lib/getrandomstring';
import {Range, Record, List} from 'immutable';

const initialState = new (Record({
  list: List([]),
  newTodo: new Todo
}));

const revive = state => initialState.merge({
  list: state.get('list').map(todo => new Todo(todo)),
  newTodo: new Todo(state.get('newTodo'))
});

export default function todoReducer(state = initialState, action) {

  if (!(state instanceof Record)) return revive(state);

  switch (action.type) {

    case actions.ADD_HUNDRED_TODOS:
      return state.update('list', list => list.withMutations(list => {
        list.concat(Range(0, 100).map(i => {
          const id = getRandomString();
          return new Todo({
            id,
            title: `Item #${id}`
          });
        }));
      }));

    case actions.ADD_TODO:
      return state
        .update('list', (list) => {
          const todo = action.payload;
          const newTodo = todo.merge({
            id: getRandomString()
          });
          return list.push(newTodo);
        })
        .set('newTodo', new Todo);

    case actions.CLEAR_ALL:
      return initialState;

    case actions.DELETE_TODO: {
      const {todo} = action.payload;
      const todoIndex = state.list.indexOf(todo);
      return state.update('list', list => list.delete(todoIndex));
    }

    case actions.ON_TODO_FIELD_CHANGE: {
      const {id, name, value} = action.payload;
      return state.update('list', list => {
        const idx = list.findIndex(todo => todo.id === id);
        return list
          .setIn([idx, name], value)
          .setIn([idx, 'completed'], false);
      });
    }

    case actions.ON_NEW_TODO_FIELD_CHANGE: {
      const {name, value} = action.payload;
      return state.setIn(['newTodo', name], value);
    }

    case actions.TOGGLE_TODO_COMPLETED: {
      const {todo} = action.payload;
      const todoIndex = state.list.indexOf(todo);
      return state
        .updateIn(['list', todoIndex, 'completed'], completed => !completed);
    }

    case actions.CLEAR_COMPLETED_TODOS:
      return state
        .update('list', list => list.filter(todo => !todo.completed));

  }

  return state;
};

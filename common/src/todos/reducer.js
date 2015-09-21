import * as actions from './actions';
import Todo from './todo';
import getRandomString from '../lib/getRandomString';
import {Range, Record} from 'immutable';

const InitialState = Record({
  list: [],
  newTodo: null
});
const initialState = new InitialState;

// Note how JSON from server is revived to immutable record.
const revive = ({list, newTodo}) => initialState.merge({
  list: list.map(todo => new Todo(todo)),
  newTodo: new Todo(newTodo)
});

export default function todosReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return revive(state);

  switch (action.type) {

    case actions.SET_NEW_TODO_FIELD: {
      const {name, value} = action.payload;
      return state.setIn(['newTodo', name], value);
    }

    case actions.ADD_TODO: {
      const {todo} = action.payload;
      const newTodo = todo.merge({
        id: getRandomString(),
        title: todo.title.trim()
      });
      return state
        .update('list', list => list.push(newTodo))
        .set('newTodo', new Todo);
    }

    case actions.DELETE_TODO: {
      const {id} = action.payload;
      return state.update('list', list =>
        list.delete(list.findIndex(todo => todo.id === id))
      );
    }

    case actions.CLEAR_ALL: {
      return state
        .update('list', list => list.clear())
        .set('newTodo', new Todo);
    }

    case actions.ADD_HUNDRED_TODOS: {
      const todos = Range(0, 100).map(() => {
        const id = getRandomString();
        return new Todo({id, title: `Item #${id}`});
      }).toArray();
      return state.update('list', list => list.push(...todos));
    }

  }

  return state;
}

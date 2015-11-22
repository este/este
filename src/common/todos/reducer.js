import * as actions from './actions';
import Todo from './todo';
import getRandomString from '../lib/getRandomString';
import {List, Range, Record} from 'immutable';

const InitialState = Record({
  list: List(),
  newTodo: new Todo
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

    case actions.ADD_HUNDRED_TODOS: {
      const todos = Range(0, 100).map(() => {
        const id = getRandomString();
        return new Todo({id, title: `Item #${id}`});
      }).toArray();
      return state.update('list', list => list.push(...todos));
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

    case actions.CLEAR_ALL_COMPLETED_TODOS: {
      return state
        .update('list', list => list.filterNot(todo => todo.completed));
    }

    case actions.CLEAR_ALL_TODOS: {
      return state.update('list', list => list.clear());
    }

    case actions.DELETE_TODO: {
      const {id} = action.payload;
      return state.update('list', list =>
        list.delete(list.findIndex(todo => todo.id === id))
      );
    }

    case actions.FETCH_USER_TODOS_SUCCESS: {
      const userTodos = List(action.payload.todos.map(json => new Todo(json)));
      // Don't update non empty list since todos are not persisted in this demo.
      if (state.get('list').size) return state;
      return state.set('list', List(userTodos));
    }

    case actions.ON_NEW_TODO_CHANGE: {
      const {name, value} = action.payload;
      return state.setIn(['newTodo', name], value);
    }

    case actions.TOGGLE_TODO_COMPLETED: {
      const {todo} = action.payload;
      const todoIndex = state.list.indexOf(todo);
      return state
        .updateIn(['list', todoIndex, 'completed'], completed => !completed);
    }

  }

  return state;
}

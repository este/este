import * as actions from './actions';
import {REVIVE_STATE} from '../app/actions';
import Todo from './todo';
import {Range, Record, List} from 'immutable';

const initialState = new (Record({
  list: List([]),
  newTodo: new Todo
}));

const revive = state => initialState.merge({
  list: state.list.map(todo => new Todo(todo)),
  newTodo: new Todo(state.newTodo)
});

export default function todoReducer(state = initialState, action) {

  switch (action.type) {

    case actions.ADD_HUNDRED_TODOS: {
      const size = state.list.size;
      return state.update('list', list => list.concat(
        Range(size, size + 100).map(i => new Todo({
          id: i,
          title: `Item #${i}`
        })
      )));
    }

    case actions.ADD_TODO: {
      const {title} = action.payload;
      const id = state.list.size;
      if (title.length === 0) return state;
      return state
        .update('list', list => list.push(new Todo({id, title})))
        .remove('newTodo');
    }

    case actions.CLEAR_ALL_TODOS:
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

    case REVIVE_STATE: {
      const {todos} = action.payload;
      return todos ? revive(todos) : state;
    }

  }

  return state;
};

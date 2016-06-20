import * as actions from './actions';
import Todo from './todo';
import { Map, Record, Seq } from 'immutable';

const InitialState = Record({
  map: Map()
});

const reviveMap = map => Seq(map)
  .map(json => new Todo(json))
  .toMap();

const revive = ({ map }) => new InitialState({
  map: reviveMap(map)
});

export default function todosReducer(state = new InitialState, action) {
  if (!(state instanceof InitialState)) return revive(state);

  switch (action.type) {

    case actions.ADD_HUNDRED_TODOS: {
      const todos = action.payload.reduce((todos, json) =>
        todos.set(json.id, new Todo(json))
      , Map());
      return state.update('map', map => map.merge(todos));
    }

    case actions.ADD_TODO: {
      const todo = new Todo(action.payload);
      return state.update('map', map => map.set(todo.id, todo));
    }

    case actions.CLEAR_ALL_COMPLETED_TODOS: {
      return state.update('map', map => map.filterNot(todo => todo.completed));
    }

    case actions.CLEAR_ALL_TODOS: {
      return state.update('map', map => map.clear());
    }

    case actions.DELETE_TODO: {
      const { id } = action.payload;
      return state.update('map', map => map.delete(id));
    }

    case actions.TOGGLE_TODO_COMPLETED: {
      const { todo } = action.payload;
      return state.updateIn(['map', todo.id, 'completed'], value => !value);
    }

  }

  return state;
}

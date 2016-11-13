/* @flow weak */
import * as actions from './actions';
import R from 'ramda';
import createTodo from './createTodo';

const initialState = {
  all: {},
};

const todosReducer = (state = initialState, action) => {
  switch (action.type) {

    case actions.ADD_HUNDRED_TODOS: {
      return action.payload.todos
        .map(createTodo)
        .reduce((state, todo) =>
          R.assocPath(['all', todo.id], todo, state)
        , state);
    }

    case actions.ADD_TODO: {
      const todo = createTodo(action.payload);
      return R.assocPath(['all', todo.id], todo, state);
    }

    case actions.CLEAR_ALL_COMPLETED_TODOS: {
      return { ...state, all: R.filter(todo => !todo.completed, state.all) };
    }

    case actions.CLEAR_ALL_TODOS: {
      return { ...state, all: {} };
    }

    case actions.DELETE_TODO: {
      return R.dissocPath(['all', action.payload.id], state);
    }

    case actions.TOGGLE_TODO_COMPLETED: {
      const { id, completed } = action.payload.todo;
      return R.assocPath(['all', id, 'completed'], !completed, state);
    }

    default:
      return state;

  }
};

export default todosReducer;

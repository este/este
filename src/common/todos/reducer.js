/* @flow */
import type { Action, TodosState } from '../types';
import R from 'ramda';

const initialState = {
  all: {},
};

const reducer = (
  state: TodosState = initialState,
  action: Action,
): TodosState => {
  switch (action.type) {

    case 'ADD_HUNDRED_TODOS': {
      return action.payload.todos
        .reduce((state, todo) =>
          R.assocPath(['all', todo.id], todo, state)
        , state);
    }

    case 'ADD_TODO': {
      const { todo } = action.payload;
      return R.assocPath(['all', todo.id], todo, state);
    }

    case 'CLEAR_ALL_COMPLETED_TODOS': {
      return { ...state, all: R.filter(todo => !todo.completed, state.all) };
    }

    case 'CLEAR_ALL_TODOS': {
      return { ...state, all: {} };
    }

    case 'DELETE_TODO': {
      return R.dissocPath(['all', action.payload.id], state);
    }

    case 'TOGGLE_TODO_COMPLETED': {
      const { id, completed } = action.payload.todo;
      return R.assocPath(['all', id, 'completed'], !completed, state);
    }

    default:
      return state;

  }
};

export default reducer;

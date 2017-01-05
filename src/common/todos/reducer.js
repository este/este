// @flow
import type { Action, TodosState } from '../types';
import { assocPath, dissocPath, filter } from 'ramda';

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
          assocPath(['all', todo.id], todo, state)
        , state);
    }

    case 'ADD_TODO': {
      const { todo } = action.payload;
      return assocPath(['all', todo.id], todo, state);
    }

    case 'CLEAR_ALL_COMPLETED_TODOS': {
      return { ...state, all: filter(todo => !todo.completed, state.all) };
    }

    case 'CLEAR_ALL_TODOS': {
      return { ...state, all: {} };
    }

    case 'DELETE_TODO': {
      return dissocPath(['all', action.payload.id], state);
    }

    case 'TOGGLE_TODO_COMPLETED': {
      const { id, completed } = action.payload.todo;
      return assocPath(['all', id, 'completed'], !completed, state);
    }

    default:
      return state;

  }
};

export default reducer;

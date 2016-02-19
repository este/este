import * as actions from './actions';
import {Map} from 'immutable';

const initialState = Map();

export default function todosReducer(state = initialState, action) {
  if (!(state instanceof Map)) return initialState.mergeDeep(state);

  switch (action.type) {

    case actions.RESET_FIELDS: {
      const {path} = action.payload;
      return state.deleteIn(path);
    }

    case actions.SET_FIELD: {
      const {path, value} = action.payload;
      return state.setIn(path, value);
    }

  }

  return state;
}

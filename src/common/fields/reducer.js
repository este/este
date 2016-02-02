import * as actions from './actions';
import {Map} from 'immutable';

export default function todosReducer(state = Map(), action) {
  if (!(state instanceof Map)) return Map().mergeDeep(state);

  switch (action.type) {

    case actions.DELETE_FIELD: {
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

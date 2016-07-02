import * as actions from './actions';
import { Map } from 'immutable';

export default function fieldsReducer(state = Map(), action) {
  switch (action.type) {

    case actions.FIELDS_RESET_FIELDS: {
      const { path } = action.payload;
      return state.deleteIn(path);
    }

    case actions.FIELDS_SET_FIELD: {
      const { path, value } = action.payload;
      return state.setIn(path, value);
    }

  }

  return state;
}

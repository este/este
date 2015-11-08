import * as actions from './actions';
import Form from './form';
import {Record} from 'immutable';

const InitialState = Record({
  form: new Form
});
const initialState = new InitialState;

export default function authReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);

  switch (action.type) {

    case actions.ON_AUTH_FORM_FIELD_CHANGE: {
      const {name, value} = action.payload;
      return state.setIn(['form', 'fields', name], value);
    }

    case actions.LOGIN_START:
      return state.setIn(['form', 'disabled'], true);

    case actions.LOGIN_SUCCESS:
    case actions.LOGIN_ERROR: {
      const error = action.type === actions.LOGIN_ERROR ? action.payload : null;
      return state
        .setIn(['form', 'disabled'], false)
        .setIn(['form', 'error'], error);
    }

  }

  return state;
}

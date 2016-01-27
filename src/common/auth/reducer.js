import * as actions from './actions';
import {Record} from 'immutable';

const InitialState = Record({
  formDisabled: false,
  formError: null
});
const initialState = new InitialState;

export default function authReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);

  switch (action.type) {

    case actions.LOGIN_START:
      return state.set('formDisabled', true);

    case actions.LOGIN_SUCCESS:
    case actions.LOGIN_ERROR: {
      const error = action.type === actions.LOGIN_ERROR
        ? action.payload
        : null;
      return state
        .set('formDisabled', false)
        .set('formError', error);
    }

  }

  return state;
}

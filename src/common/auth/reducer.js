import * as actions from './actions';
import * as firebaseActions from '../lib/redux-firebase/actions';
import {Record} from 'immutable';

const InitialState = Record({
  formDisabled: false,
  formError: null
});
const initialState = new InitialState;

export default function authReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);

  switch (action.type) {

    // Note how different actions can share one reducer.
    case actions.LOGIN_START:
    case firebaseActions.REDUX_FIREBASE_LOGIN_START:
      return state.set('formDisabled', true);

    case actions.LOGIN_ERROR:
    case firebaseActions.REDUX_FIREBASE_LOGIN_ERROR:
      return state.merge({formDisabled: false, formError: action.payload});

    case actions.LOGIN_SUCCESS:
    case firebaseActions.REDUX_FIREBASE_LOGIN_SUCCESS:
      return state.merge({formDisabled: false, formError: null});

    // TODO: Add SIGN_UP examples.

  }

  return state;
}

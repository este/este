import * as actions from './actions';
import {Record} from 'immutable';
import {firebaseActions} from '../lib/redux-firebase';

const InitialState = Record({
  formDisabled: false,
  formError: null
});
const initialState = new InitialState;

export default function authReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);

  switch (action.type) {

    // Note how one reducer can handle several actions.
    case actions.LOGIN_START:
    case firebaseActions.REDUX_FIREBASE_LOGIN_START:
    case firebaseActions.REDUX_FIREBASE_RESET_PASSWORD_START:
    case firebaseActions.REDUX_FIREBASE_SIGN_UP_START:
      return state.set('formDisabled', true);

    case actions.LOGIN_ERROR:
    case firebaseActions.REDUX_FIREBASE_LOGIN_ERROR:
    case firebaseActions.REDUX_FIREBASE_RESET_PASSWORD_ERROR:
    case firebaseActions.REDUX_FIREBASE_SIGN_UP_ERROR:
      return state.merge({formDisabled: false, formError: action.payload});

    case actions.LOGIN_SUCCESS:
    case firebaseActions.REDUX_FIREBASE_LOGIN_SUCCESS:
    case firebaseActions.REDUX_FIREBASE_RESET_PASSWORD_SUCCESS:
    case firebaseActions.REDUX_FIREBASE_SIGN_UP_SUCCESS:
      return state.merge({formDisabled: false, formError: null});

  }

  return state;
}

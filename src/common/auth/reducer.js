import { Record } from 'immutable';
import { firebaseActions } from '../lib/redux-firebase';

const InitialState = Record({
  formDisabled: false,
  formError: null,
  isAuthenticated: false,
  token: null,
});

export default function authReducer(state = new InitialState, action) {
  if (!(state instanceof InitialState)) return new InitialState(state);

  switch (action.type) {

    case firebaseActions.FIREBASE_LOGIN_START:
    case firebaseActions.FIREBASE_RESET_PASSWORD_START:
    case firebaseActions.FIREBASE_SIGN_UP_START:
      return state.set('formDisabled', true);

    case firebaseActions.FIREBASE_LOGIN_ERROR:
    case firebaseActions.FIREBASE_RESET_PASSWORD_ERROR:
    case firebaseActions.FIREBASE_SIGN_UP_ERROR:
      return state.merge({
        formDisabled: false,
        formError: action.payload
      });

    case firebaseActions.FIREBASE_LOGIN_SUCCESS:
    case firebaseActions.FIREBASE_RESET_PASSWORD_SUCCESS:
    case firebaseActions.FIREBASE_SIGN_UP_SUCCESS:
      return state.merge({
        formDisabled: false,
        formError: null
      });

    case firebaseActions.FIREBASE_ON_AUTH: {
      const { authData } = action.payload;
      return state.merge({
        isAuthenticated: !!authData,
        // Note the auth token is updated lazily aka only with the new one.
        // The token must be stored in a storage because Firebase 3 needs it.
        token: authData && authData.token || state.token,
      });
    }

  }

  return state;
}

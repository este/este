import { Record } from '../transit';
import { firebaseActions } from '../lib/redux-firebase';

const InitialState = Record({
  formDisabled: false,
  error: null,
  success: null, // To get accessToken, refreshToken, whatever.
}, 'auth');

export default function authReducer(state = new InitialState, action) {
  switch (action.type) {

    case firebaseActions.FIREBASE_RESET_PASSWORD_START:
    case firebaseActions.FIREBASE_SIGN_IN_START:
    case firebaseActions.FIREBASE_SIGN_UP_START: {
      return state
        .set('formDisabled', true);
    }

    case firebaseActions.FIREBASE_RESET_PASSWORD_ERROR:
    case firebaseActions.FIREBASE_SIGN_IN_ERROR:
    case firebaseActions.FIREBASE_SIGN_UP_ERROR: {
      return state
        .set('formDisabled', false)
        .set('error', action.payload);
    }

    case firebaseActions.FIREBASE_RESET_PASSWORD_SUCCESS:
    case firebaseActions.FIREBASE_SIGN_IN_SUCCESS:
    case firebaseActions.FIREBASE_SIGN_UP_SUCCESS: {
      return state
        .set('formDisabled', false)
        .set('error', null)
        .set('success', action.payload);
    }

  }

  return state;
}

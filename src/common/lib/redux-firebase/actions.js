import mapAuthToUser from './mapAuthToUser';

/* eslint-disable max-len */
export const ESTE_REDUX_FIREBASE_LOGIN_ERROR = 'ESTE_REDUX_FIREBASE_LOGIN_ERROR';
export const ESTE_REDUX_FIREBASE_LOGIN_START = 'ESTE_REDUX_FIREBASE_LOGIN_START';
export const ESTE_REDUX_FIREBASE_LOGIN_SUCCESS = 'ESTE_REDUX_FIREBASE_LOGIN_SUCCESS';
export const ESTE_REDUX_FIREBASE_OFF_QUERY = 'ESTE_REDUX_FIREBASE_OFF_QUERY';
export const ESTE_REDUX_FIREBASE_ON_AUTH = 'ESTE_REDUX_FIREBASE_ON_AUTH';
export const ESTE_REDUX_FIREBASE_ON_QUERY = 'ESTE_REDUX_FIREBASE_ON_QUERY';
export const ESTE_REDUX_FIREBASE_RESET_PASSWORD_ERROR = 'ESTE_REDUX_FIREBASE_RESET_PASSWORD_ERROR';
export const ESTE_REDUX_FIREBASE_RESET_PASSWORD_START = 'ESTE_REDUX_FIREBASE_RESET_PASSWORD_START';
export const ESTE_REDUX_FIREBASE_RESET_PASSWORD_SUCCESS = 'ESTE_REDUX_FIREBASE_RESET_PASSWORD_SUCCESS';
export const ESTE_REDUX_FIREBASE_SAVE_USER_ON_AUTH_ERROR = 'ESTE_REDUX_FIREBASE_SAVE_USER_ON_AUTH_ERROR';
export const ESTE_REDUX_FIREBASE_SAVE_USER_ON_AUTH_START = 'ESTE_REDUX_FIREBASE_SAVE_USER_ON_AUTH_START';
export const ESTE_REDUX_FIREBASE_SAVE_USER_ON_AUTH_SUCCESS = 'ESTE_REDUX_FIREBASE_SAVE_USER_ON_AUTH_SUCCESS';
export const ESTE_REDUX_FIREBASE_SIGN_UP_ERROR = 'ESTE_REDUX_FIREBASE_SIGN_UP_ERROR';
export const ESTE_REDUX_FIREBASE_SIGN_UP_START = 'ESTE_REDUX_FIREBASE_SIGN_UP_START';
export const ESTE_REDUX_FIREBASE_SIGN_UP_SUCCESS = 'ESTE_REDUX_FIREBASE_SIGN_UP_SUCCESS';
export const ESTE_REDUX_FIREBASE_WATCH_AUTH = 'ESTE_REDUX_FIREBASE_WATCH_AUTH';
/* eslint-enable max-len */

// Doesn't work on React Native, because there is no window nor redirect.
// Use React Native Facebook login component with authWithOAuthToken instead.
async function socialLogin(firebase, provider) {
  const settings = { scope: 'email,user_friends' };
  // https://www.firebase.com/docs/web/guide/user-auth.html#section-popups
  try {
    await firebase.authWithOAuthPopup(provider, settings);
  } catch (error) {
    if (error.code === 'TRANSPORT_UNAVAILABLE') {
      // Pass an empty function until Firebase fix bug.
      await firebase.authWithOAuthRedirect(provider, () => {}, settings);
    }
    throw error;
  }
}

function saveUserOnAuth(authData) {
  return ({ firebase }) => {
    const user = mapAuthToUser(authData);
    user.authenticatedAt = firebase.constructor.ServerValue.TIMESTAMP;
    const { email } = user;
    // Delete Facebook etc. user email for better security.
    delete user.email;
    // But use it as displayName for users logged in via email, because that's
    // the only info we have.
    if (user.provider === 'password') {
      user.displayName = email;
    }
    // With Firebase multi-path updates, we can update values at multiple
    // locations at the same time. Powerful feature for data denormalization.
    const promise = firebase.update({
      [`users/${user.id}`]: user,
      [`users-emails/${user.id}`]: { email }
    });
    return {
      type: 'ESTE_REDUX_FIREBASE_SAVE_USER_ON_AUTH',
      payload: promise
    };
  };
}

export function login(provider, fields) {
  return ({ firebase }) => {
    const promise = provider === 'password'
      ? firebase.authWithPassword(fields)
      : socialLogin(firebase, provider);
    return {
      type: 'ESTE_REDUX_FIREBASE_LOGIN',
      payload: promise
    };
  };
}

export function onAuth(authData) {
  return {
    type: ESTE_REDUX_FIREBASE_ON_AUTH,
    payload: { authData }
  };
}

export function resetPassword(email) {
  return ({ firebase }) => {
    const promise = firebase.resetPassword({ email });
    return {
      type: 'ESTE_REDUX_FIREBASE_RESET_PASSWORD',
      payload: promise
    };
  };
}

export function signUp(fields) {
  return ({ firebase }) => {
    const getPromise = async () => {
      await firebase.createUser(fields);
      await firebase.authWithPassword(fields);
    };
    return {
      type: 'ESTE_REDUX_FIREBASE_SIGN_UP',
      payload: getPromise()
    };
  };
}

export function watchAuth(logout) {
  let wasAuthenticated = false;
  return ({ dispatch, firebase }) => {
    // Use sync getAuth to set app state immediately.
    dispatch(onAuth(firebase.getAuth()));
    // Watch auth.
    firebase.onAuth(authData => {
      dispatch(onAuth(authData));
      if (authData) {
        wasAuthenticated = true;
        dispatch(saveUserOnAuth(authData));
      } else {
        if (wasAuthenticated) dispatch(logout());
      }
    });
    return {
      type: ESTE_REDUX_FIREBASE_WATCH_AUTH
    };
  };
}

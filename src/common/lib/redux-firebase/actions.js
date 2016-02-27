import mapAuthToUser from './mapAuthToUser';

export const REDUX_FIREBASE_LOGIN_ERROR = 'REDUX_FIREBASE_LOGIN_ERROR';
export const REDUX_FIREBASE_LOGIN_START = 'REDUX_FIREBASE_LOGIN_START';
export const REDUX_FIREBASE_LOGIN_SUCCESS = 'REDUX_FIREBASE_LOGIN_SUCCESS';
export const REDUX_FIREBASE_OFF_QUERY = 'REDUX_FIREBASE_OFF_QUERY';
export const REDUX_FIREBASE_ON_AUTH = 'REDUX_FIREBASE_ON_AUTH';
export const REDUX_FIREBASE_ON_QUERY = 'REDUX_FIREBASE_ON_QUERY';
export const REDUX_FIREBASE_RESET_PASSWORD_ERROR = 'REDUX_FIREBASE_RESET_PASSWORD_ERROR';
export const REDUX_FIREBASE_RESET_PASSWORD_START = 'REDUX_FIREBASE_RESET_PASSWORD_START';
export const REDUX_FIREBASE_RESET_PASSWORD_SUCCESS = 'REDUX_FIREBASE_RESET_PASSWORD_SUCCESS';
export const REDUX_FIREBASE_SAVE_USER_ON_AUTH_ERROR = 'REDUX_FIREBASE_SAVE_USER_ON_AUTH_ERROR';
export const REDUX_FIREBASE_SAVE_USER_ON_AUTH_START = 'REDUX_FIREBASE_SAVE_USER_ON_AUTH_START';
export const REDUX_FIREBASE_SAVE_USER_ON_AUTH_SUCCESS = 'REDUX_FIREBASE_SAVE_USER_ON_AUTH_SUCCESS';
export const REDUX_FIREBASE_SIGN_UP_ERROR = 'REDUX_FIREBASE_SIGN_UP_ERROR';
export const REDUX_FIREBASE_SIGN_UP_START = 'REDUX_FIREBASE_SIGN_UP_START';
export const REDUX_FIREBASE_SIGN_UP_SUCCESS = 'REDUX_FIREBASE_SIGN_UP_SUCCESS';
export const REDUX_FIREBASE_WATCH_AUTH = 'REDUX_FIREBASE_WATCH_AUTH';

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
    delete user.email;
    // With Firebase multi-path updates, we can update values at multiple
    // locations at the same time. Powerful feature for data denormalization.
    const promise = firebase.update({
      [`users/${user.id}`]: user,
      [`users-emails/${user.id}`]: { email }
    });
    return {
      type: 'REDUX_FIREBASE_SAVE_USER_ON_AUTH',
      payload: { promise }
    };
  };
}

export function login(provider, fields) {
  return ({ firebase }) => {
    const promise = provider === 'password'
      ? firebase.authWithPassword(fields)
      : socialLogin(firebase, provider);
    return {
      type: 'REDUX_FIREBASE_LOGIN',
      payload: { promise }
    };
  };
}

export function onAuth(authData) {
  return {
    type: REDUX_FIREBASE_ON_AUTH,
    payload: { authData }
  };
}

export function resetPassword(email) {
  return ({ firebase }) => {
    const promise = firebase.resetPassword({ email });
    return {
      type: 'REDUX_FIREBASE_RESET_PASSWORD',
      payload: { promise }
    };
  };
}

export function signUp(fields) {
  return ({ firebase }) => {
    // This is a beautiful example of async / await over plain promises.
    // Note async function handles errors automatically.
    async function getPromise() {
      await firebase.createUser(fields);
      await firebase.authWithPassword(fields);
    }
    return {
      type: 'REDUX_FIREBASE_SIGN_UP',
      payload: {
        promise: getPromise()
      }
    };
  };
}

export function watchAuth(logout) {
  return ({ dispatch, firebase }) => {
    // Use sync getAuth to set app state immediately.
    dispatch(onAuth(firebase.getAuth()));
    // Watch auth.
    firebase.onAuth(authData => {
      dispatch(onAuth(authData));
      if (authData) {
        dispatch(saveUserOnAuth(authData));
      } else {
        dispatch(logout());
      }
    });
    return {
      type: REDUX_FIREBASE_WATCH_AUTH
    };
  };
}

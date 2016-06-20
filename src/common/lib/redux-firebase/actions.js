import mapAuthToUser from './mapAuthToUser';

export const FIREBASE_LOGIN_ERROR = 'FIREBASE_LOGIN_ERROR';
export const FIREBASE_LOGIN_START = 'FIREBASE_LOGIN_START';
export const FIREBASE_LOGIN_SUCCESS = 'FIREBASE_LOGIN_SUCCESS';
export const FIREBASE_OFF_QUERY = 'FIREBASE_OFF_QUERY';
export const FIREBASE_ON_AUTH = 'FIREBASE_ON_AUTH';
export const FIREBASE_ON_PERMISSION_DENIED = 'FIREBASE_ON_PERMISSION_DENIED';
export const FIREBASE_ON_QUERY = 'FIREBASE_ON_QUERY';
export const FIREBASE_RESET_PASSWORD_ERROR = 'FIREBASE_RESET_PASSWORD_ERROR';
export const FIREBASE_RESET_PASSWORD_START = 'FIREBASE_RESET_PASSWORD_START';
export const FIREBASE_RESET_PASSWORD_SUCCESS = 'FIREBASE_RESET_PASSWORD_SUCCESS';
export const FIREBASE_SAVE_USER_ERROR = 'FIREBASE_SAVE_USER_ERROR';
export const FIREBASE_SAVE_USER_START = 'FIREBASE_SAVE_USER_START';
export const FIREBASE_SAVE_USER_SUCCESS = 'FIREBASE_SAVE_USER_SUCCESS';
export const FIREBASE_SIGN_UP_ERROR = 'FIREBASE_SIGN_UP_ERROR';
export const FIREBASE_SIGN_UP_START = 'FIREBASE_SIGN_UP_START';
export const FIREBASE_SIGN_UP_SUCCESS = 'FIREBASE_SIGN_UP_SUCCESS';
// export const FIREBASE_WATCH_AUTH = 'FIREBASE_WATCH_AUTH';

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

export function saveUser(authData) {
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
      type: 'FIREBASE_SAVE_USER',
      payload: promise,
      meta: { user },
    };
  };
}

export function login(provider, fields) {
  return ({ firebase }) => {
    const promise = provider === 'password'
      ? firebase.authWithPassword(fields)
      : socialLogin(firebase, provider);
    return {
      type: 'FIREBASE_LOGIN',
      payload: promise
    };
  };
}

export function onAuth(authData) {
  return {
    type: FIREBASE_ON_AUTH,
    payload: { authData }
  };
}

export function onPermissionDenied(message) {
  return {
    type: FIREBASE_ON_PERMISSION_DENIED,
    payload: { message }
  };
}

export function resetPassword(email) {
  return ({ firebase }) => {
    const promise = firebase.resetPassword({ email });
    return {
      type: 'FIREBASE_RESET_PASSWORD',
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
      type: 'FIREBASE_SIGN_UP',
      payload: getPromise()
    };
  };
}

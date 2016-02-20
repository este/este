import mapAuthToUser from './mapAuthToUser';

export const REDUX_FIREBASE_LOGIN_ERROR = 'REDUX_FIREBASE_LOGIN_ERROR';
export const REDUX_FIREBASE_LOGIN_START = 'REDUX_FIREBASE_LOGIN_START';
export const REDUX_FIREBASE_LOGIN_SUCCESS = 'REDUX_FIREBASE_LOGIN_SUCCESS';
export const REDUX_FIREBASE_OFF_QUERY = 'REDUX_FIREBASE_OFF_QUERY';
export const REDUX_FIREBASE_ON_AUTH = 'REDUX_FIREBASE_ON_AUTH';
export const REDUX_FIREBASE_ON_QUERY = 'REDUX_FIREBASE_ON_QUERY';
export const REDUX_FIREBASE_SIGN_UP_ERROR = 'REDUX_FIREBASE_SIGN_UP_ERROR';
export const REDUX_FIREBASE_SIGN_UP_START = 'REDUX_FIREBASE_SIGN_UP_START';
export const REDUX_FIREBASE_SIGN_UP_SUCCESS = 'REDUX_FIREBASE_SIGN_UP_SUCCESS';
export const REDUX_FIREBASE_WATCH_AUTH = 'REDUX_FIREBASE_WATCH_AUTH';

async function socialLogin(firebase, provider) {
  const settings = {scope: 'email'};
  // https://www.firebase.com/docs/web/guide/user-auth.html#section-popups
  try {
    await firebase.authWithOAuthPopup(provider, settings);
  } catch (error) {
    if (error.code === 'TRANSPORT_UNAVAILABLE') {
      await firebase.authWithOAuthRedirect(provider, settings);
    }
    throw error;
  }
}

export function login(provider, fields) {
  return ({firebase}) => {

    const promise = provider === 'password'
      ? firebase.authWithPassword(fields)
      : socialLogin(firebase, provider);

    return {
      type: 'REDUX_FIREBASE_LOGIN',
      payload: {promise}
    };
  };
}

export function onAuth(authData) {
  return {
    type: REDUX_FIREBASE_ON_AUTH,
    payload: {authData}
  };
}

export function signUp(fields) {
  return ({firebase}) => {

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
  return ({dispatch, firebase}) => {
    // Use sync getAuth to set app state immediately.
    dispatch(onAuth(firebase.getAuth()));

    // Watch auth.
    firebase.onAuth(authData => {
      dispatch(onAuth(authData));
      if (authData) {
        // Always save authenticated user to keep user authData fresh.
        const user = mapAuthToUser(authData);
        firebase.child('users').child(user.id).set(user);
      } else {
        // Logout recycles app state.
        dispatch(logout());
      }
    });

    return {
      type: REDUX_FIREBASE_WATCH_AUTH
    };
  };
}

import mapAuthToUser from './mapAuthToUser';

export const REDUX_FIREBASE_LOGIN_ERROR = 'REDUX_FIREBASE_LOGIN_ERROR';
export const REDUX_FIREBASE_LOGIN_START = 'REDUX_FIREBASE_LOGIN_START';
export const REDUX_FIREBASE_LOGIN_SUCCESS = 'REDUX_FIREBASE_LOGIN_SUCCESS';
export const REDUX_FIREBASE_OFF_QUERY = 'REDUX_FIREBASE_OFF_QUERY';
export const REDUX_FIREBASE_ON_AUTH = 'REDUX_FIREBASE_ON_AUTH';
export const REDUX_FIREBASE_ON_QUERY = 'REDUX_FIREBASE_ON_QUERY';

// TODO: Add support for other social auth providers.
export function login() {
  return ({firebase}) => {
    const settings = {scope: 'email'};
    const promise = firebase
      // Prefer pop-ups, so we don't navigate away from the page.
      .authWithOAuthPopup('facebook', settings)
      .catch(error => {
        if (error.code === 'TRANSPORT_UNAVAILABLE') {
          // Fall-back to browser redirects, and pick up the session
          // automatically when we come back to the origin page.
          // This flow is recommended by Firebase docs.
          return firebase.authWithOAuthRedirect('facebook', settings);
        }
        throw error;
      })
      .then(authData => {
        // Always save authenticated user to Firebase to ensure fresh data.
        const user = mapAuthToUser(authData);
        return firebase.child('users').child(user.id).set(user);
      });

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

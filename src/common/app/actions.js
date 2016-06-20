import { firebaseActions } from '../lib/redux-firebase';

export const APP_OFFLINE = 'APP_OFFLINE';
export const APP_ONLINE = 'APP_ONLINE';
export const APP_START = 'APP_START';
export const APP_STORAGE_LOAD = 'APP_STORAGE_LOAD';

const monitorNetworkStatus = (dispatch, firebase, getState) => {
  firebase.child('.info/connected').on('value', snap => {
    const online = snap.val();
    if (getState().app.online === online) return;
    dispatch({
      type: online ? APP_ONLINE : APP_OFFLINE
    });
  });
};

const loadStorage = async (dispatch, storageEngine) => {
  const state = await storageEngine.load();
  dispatch({ type: APP_STORAGE_LOAD, payload: state });
};

const maybeSaveUser = (authData, dispatch) => {
  // authData contains user profile data only shortly after login
  const isAuthenticatedWithProfile = authData && authData[authData.provider];
  if (!isAuthenticatedWithProfile) return;
  dispatch(firebaseActions.saveUser(authData));
};

const monitorFirebaseAuth = (dispatch, firebase) => {
  firebase.onAuth(authData => {
    dispatch(firebaseActions.onAuth(authData));
    // // Authenticated query test.
    // if (authData) {
    //   firebase
    //     .child('users-emails/CZESPovyI1YmjGBYW5Xk7lJk7Vn2')
    //     .on('value', snap => {
    //       console.log(JSON.stringify(snap.val()));
    //     }, error => {
    //       console.log(error.code, error.message);
    //     });
    // }
    maybeSaveUser(authData, dispatch);
  });
};

const maybeAuthWithToken = (firebase, token) => {
  if (!token) return;
  // Note we use authWithCustomToken because:
  // - It's future compatible with Firebase 3.
  //   firebase.google.com/support/guides/firebase-web#get_the_access_token_numbered
  // - React Native needs github.com/facebook/react-native-fbsdk token anyway.
  // - With authWithCustomToken, we have universal auth on app start.
  firebase.authWithCustomToken(token);
};

export function start() {
  return ({ dispatch, firebase, getState, storageEngine }) => {
    monitorNetworkStatus(dispatch, firebase, getState);
    loadStorage(dispatch, storageEngine).finally(() => {
      monitorFirebaseAuth(dispatch, firebase);
      maybeAuthWithToken(firebase, getState().auth.token);
    });

    return {
      type: APP_START
    };
  };
}

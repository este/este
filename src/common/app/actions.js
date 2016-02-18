import * as firebaseAction from '../lib/redux-firebase/actions';

export const ON_APP_COMPONENT_DID_MOUNT = 'ON_APP_COMPONENT_DID_MOUNT';

export function onAppComponentDidMount() {
  // Who injected firebase and dispatch? Check configureStore.js injectMiddleware.
  return ({firebase, dispatch}) => {

    // Firebase has two methods to get user auth.
    //  - getAuth is sync, because it uses localStorage.
    //  - onAuth is async, because it monitors current auth from server.

    // Sync is nice, because it updates app state immediately.
    dispatch(firebaseAction.onAuth(firebase.getAuth()));

    // Async handling of login / logout.
    firebase.onAuth(authData => {
      dispatch(firebaseAction.onAuth(authData));
    });

    return {
      type: ON_APP_COMPONENT_DID_MOUNT
    };
  };
}

import { browserHistory } from 'react-router';

// Firebase Login / Sign Up actions are in src/common/lib/redux-firebase/actions.js

export const LOGOUT = 'LOGOUT';

export function logout() {
  return ({ firebase, storageEngine }) => {
    // Always redirect to home first to ensure valid view state after logout.
    if (process.env.IS_BROWSER) {
      browserHistory.replace('/');
    }
    // Always reset client storage.
    storageEngine.save({});
    // Will dispatch FIREBASE_ON_AUTH.
    firebase.unauth();
    return {
      type: LOGOUT
    };
  };
}

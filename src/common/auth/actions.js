import { browserHistory } from 'react-router';

// Check Firebase actions in src/common/lib/redux-firebase/actions.js

export const SIGN_OUT = 'SIGN_OUT';

export function signOut() {
  return ({ firebaseAuth }) => {
    // Always redirect to home first to ensure valid view state after sign out.
    if (process.env.IS_BROWSER) {
      browserHistory.replace('/');
    }
    firebaseAuth().signOut();
    return {
      type: SIGN_OUT
    };
  };
}

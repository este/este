/* @flow weak */
export const SIGN_OUT = 'SIGN_OUT';

export const signOut = () => ({ firebaseAuth }) => {
  firebaseAuth().signOut();
  return {
    type: SIGN_OUT,
  };
};

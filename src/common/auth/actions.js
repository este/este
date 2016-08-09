export const SIGN_OUT = 'SIGN_OUT';

export function signOut() {
  return ({ firebaseAuth }) => {
    firebaseAuth().signOut();
    return {
      type: SIGN_OUT,
    };
  };
}

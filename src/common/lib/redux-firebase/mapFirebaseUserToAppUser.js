/* @flow weak */
import User from '../../users/user';

const mapFirebaseUserToAppUser = firebaseUser => {
  if (!firebaseUser) return null;
  // A Firebase User instance keeps track of every provider linked to the user.
  // https://firebase.google.com/docs/auth/users
  // Only Facebook provider is enabled right now.
  const facebookProfile = firebaseUser.providerData[0];
  return new User({
    displayName: facebookProfile.displayName || facebookProfile.email,
    email: facebookProfile.email,
    id: firebaseUser.uid,
    photoURL: facebookProfile.photoURL || '',
  });
};

export default mapFirebaseUserToAppUser;

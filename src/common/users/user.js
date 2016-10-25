/* @flow */
import { Record } from '../transit';

const User = Record({
  displayName: '',
  email: '',
  id: '',
  photoURL: '',
}, 'user');

User.fromFirebaseUser = firebaseUser => {
  if (!firebaseUser || !firebaseUser.providerData) return null;
  // Only Facebook provider is supported now.
  const facebookProfile = firebaseUser.providerData[0];
  return new User({
    displayName: facebookProfile.displayName || facebookProfile.email,
    email: facebookProfile.email,
    id: firebaseUser.uid,
    photoURL: facebookProfile.photoURL || '',
  });
};

export default User;

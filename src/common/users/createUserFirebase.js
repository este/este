/* @flow */
import type { User } from '../types';

const createUserFirebase = (json: ?Object): ?User => {
  if (!json || !json.providerData) return null;
  // Only Facebook provider is supported now.
  const facebookProfile = json.providerData[0];
  const user: User = {
    displayName: facebookProfile.displayName || facebookProfile.email,
    email: facebookProfile.email,
    id: json.uid,
    photoURL: facebookProfile.photoURL || '',
  };
  return user;
};

export default createUserFirebase;

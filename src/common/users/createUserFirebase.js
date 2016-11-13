/* @flow weak */
import createUser from './createUser';

const createUserFirebase = (json) => {
  if (!json || !json.providerData) return null;
  // Only Facebook provider is supported now.
  const facebookProfile = json.providerData[0];
  return createUser({
    displayName: facebookProfile.displayName || facebookProfile.email,
    email: facebookProfile.email,
    id: json.uid,
    photoURL: facebookProfile.photoURL || '',
  });
};

export default createUserFirebase;

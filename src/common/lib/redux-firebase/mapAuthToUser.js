import User from '../../users/user';

export default function mapAuthToUser(authData) {
  // authData contains user profile only shortly after login
  const hasProfile = authData && authData[authData.provider];
  if (!hasProfile) return null;

  const {
    uid: id,
    provider,
  } = authData;

  const {
    displayName = '',
    email = '',
    profileImageURL = ''
  } = authData[provider];

  return new User({
    displayName: displayName || email, // Because displayName is required.
    email,
    id,
    profileImageURL,
    provider
  });
}

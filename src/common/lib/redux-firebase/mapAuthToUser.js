import User from '../../users/user';

export default function mapAuthToUser(authData) {
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
    displayName,
    email,
    id,
    profileImageURL,
    provider
  });
}

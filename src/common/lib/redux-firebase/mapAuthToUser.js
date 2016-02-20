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

  return {
    displayName,
    email,
    id,
    profileImageURL,
    provider
  };
}

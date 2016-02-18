export default function mapAuthToUser(authData) {
  const {
    uid: id,
    provider,
    // TODO: Add other social auth providers.
    facebook: {
      displayName,
      email,
      profileImageURL
    }
  } = authData;

  return {
    displayName,
    email,
    id,
    profileImageURL,
    provider
  };
}

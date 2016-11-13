/* @flow weak */

const createUser = (json) => ({
  displayName: '',
  email: '',
  id: '',
  photoURL: '',
  ...json,
});

export default createUser;

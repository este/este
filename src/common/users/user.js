import { Record } from 'immutable';

// Record is like class, but immutable and with default values.
// https://facebook.github.io/immutable-js/docs/#/Record
const User = Record({
  authenticatedAt: null,
  displayName: '',
  email: '',
  id: '',
  profileImageURL: '',
  provider: ''
});

export default User;

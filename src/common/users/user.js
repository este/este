import {Record} from 'immutable';

const User = Record({
  authToken: '',
  createdAt: null,
  email: '',
});

export default User;

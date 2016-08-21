/* @flow */
import { Record } from '../transit';

const User = Record({
  displayName: '',
  email: '',
  id: '',
  photoURL: '',
}, 'user');

export default User;

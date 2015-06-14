import {Record} from 'immutable';

const UserRecord = Record({
  email: '',
  password: ''
});

export default class User extends UserRecord {}

import User from './user';
import {Map} from 'immutable';

// Define how auth initial state should be revived.
// http://facebook.github.io/immutable-js/docs/#/fromJS
export default function(value) {
  return Map(value).set('data', new User(value.get('data')));
}

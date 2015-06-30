import User from './user';
import {Map} from 'immutable';

// Define how auth initial state should be revived.
// http://facebook.github.io/immutable-js/docs/#/fromJS
export default function(value) {
  const viewer = value.get('viewer');
  return Map(value).set('viewer', viewer ? new User(viewer) : null);
}

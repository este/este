import Form from './form';
import {Map} from 'immutable';

// Define how auth initial state should be revived.
// http://facebook.github.io/immutable-js/docs/#/fromJS
export default function(value) {
  return Map(value).set('form', new Form);
}

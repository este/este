import {Record} from 'immutable';

// Record is something like class, but immutable and with default values.
// https://facebook.github.io/immutable-js/docs/#/Record
const FormRecord = Record({
  disabled: false,
  error: null,
  fields: new (Record({
    email: '',
    password: ''
  }))
});

// We can subclass FormRecord to add custom getters or methods.
export default class Form extends FormRecord {}

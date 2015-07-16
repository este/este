import {Record} from 'immutable';

// Record is something like class, but immutable and with default values.
// https://facebook.github.io/immutable-js/docs/#/Record
const FormRecord = Record({
  fields: new (Record({
    email: '',
    password: ''
  })),
  error: null
});

// We can subclass FormRecord to add custom getters or methods.
export default class Form extends FormRecord {}

import {Record} from 'immutable';

// Record is like class, but immutable and with default values.
// https://facebook.github.io/immutable-js/docs/#/Record
const Form = Record({
  disabled: false,
  error: null,
  fields: new (Record({
    email: '',
    password: ''
  }))
});

export default Form;

import {Record} from 'immutable';

// immutable Record is superuseful. It defines default values and getters.
const FormRecord = Record({
  fields: new (Record({
    email: '',
    password: ''
  })),
  error: null
});

export default class Form extends FormRecord {
  // We can add getters here. For example:
  // get emailIsTheSameAsPassword() {
  //   return this.email === this.password;
  // }
}

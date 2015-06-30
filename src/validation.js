import Validation from './lib/validation';
import {msg} from './intl/store';

class AppValidation extends Validation {

  getRequiredMessage(prop) {
    return msg('validation.required', {prop});
  }

  getEmailMessage(prop) {
    return msg('validation.email', {prop});
  }

  getSimplePasswordMessage(minLength) {
    return msg('validation.password', {minLength});
  }

}

export function validate(object: Object) {
  return new AppValidation(object);
}

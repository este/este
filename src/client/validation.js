import Validation from './lib/validation';
import {msg} from './intl/store';

class AppValidation extends Validation {

  getRequiredMessage(prop) {
    return msg('auth.validation.required', {prop});
  }

  getEmailMessage(prop) {
    return msg('auth.validation.email', {prop});
  }

  getSimplePasswordMessage(minLength) {
    return msg('auth.validation.password', {minLength});
  }

}

export function validate(object: Object) {
  return new AppValidation(object);
}

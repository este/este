import Validation from './lib/validation';
import {format} from './intl/store';

export function createValidate(msg) {

  class AppValidation extends Validation {

    // Override default messages.
    getRequiredMessage(prop) {
      return format(msg.auth.validation.required, {prop});
    }

    getEmailMessage(prop) {
      return format(msg.auth.validation.email, {prop});
    }

    getSimplePasswordMessage(minLength) {
      return format(msg.auth.validation.password, {minLength});
    }

    // Sure we can add own validation rules.

  }

  const validate = object => new AppValidation(object);

  return validate;

}

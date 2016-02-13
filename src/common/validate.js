import Validation from './lib/validation';
import ValidationError from './lib/ValidationError';
import {format} from './intl/format';

// Localized validation.
export default function validate({intl: {msg}}) {

  class LocalizedValidation extends Validation {

    getRequiredMessage(prop) {
      return format(msg.auth.validation.required, {prop});
    }

    getEmailMessage(prop) {
      return format(msg.auth.validation.email, {prop});
    }

    getSimplePasswordMessage(minLength) {
      return format(msg.auth.validation.password, {minLength});
    }

  }

  const validate = (object) => new LocalizedValidation(object);

  validate.wrongPassword = prop =>
    new ValidationError(msg.auth.form.wrongPassword, prop);

  return validate;

}

import Validation, {ValidationError} from './lib/validation';
import {intl} from '@este/common';

export default function validate(state) {

  // TODO: Refactor. Use simple selector from intl, for mapStateToProps as well.
  const locale = state.get('intl');
  const msg = intl.messages[locale.selectedLanguage];

  class LocalizedValidation extends Validation {

    getRequiredMessage(prop) {
      return intl.format(msg.auth.validation.required, {prop});
    }

    getEmailMessage(prop) {
      return intl.format(msg.auth.validation.email, {prop});
    }

    getSimplePasswordMessage(minLength) {
      return intl.format(msg.auth.validation.password, {minLength});
    }

    // Sure we can add own validation rules.

  }

  const validate = (object) => new LocalizedValidation(object);

  validate.wrongPassword = prop =>
    new ValidationError(msg.auth.form.wrongPassword, prop);

  return validate;

}

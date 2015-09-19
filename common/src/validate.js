import Validation from './lib/validation';
import {format} from './intl/format';

export default function validate(state) {

  // TODO: Refactor. Use simple selector from intl, for mapStateToProps as well.
  const intl = state.get('intl');
  const msg = intl.messages[intl.selectedLanguage];

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
    new Validation.ValidationError(msg.auth.form.wrongPassword, prop);

  return validate;

}

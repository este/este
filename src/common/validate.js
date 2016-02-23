import Validation from './lib/validation';
import ValidationError from './lib/ValidationError';
import { format } from './intl/format';

// Localized validation.
export default function validate(getState) {
  const localizedValidate = json => {
    const { msg } = getState().intl;

    class LocalizedValidation extends Validation {
      getRequiredMessage(prop) {
        return format(msg.auth.validation.required, { prop });
      }
      getEmailMessage(prop) {
        return format(msg.auth.validation.email, { prop });
      }
      getSimplePasswordMessage(minLength) {
        return format(msg.auth.validation.password, { minLength });
      }
    }

    return new LocalizedValidation(json);
  };

  localizedValidate.wrongPassword = prop => {
    const { msg } = getState().intl;
    return new ValidationError(msg.auth.form.wrongPassword, prop);
  };

  return localizedValidate;
}

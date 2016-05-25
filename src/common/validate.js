import Validation from './lib/validation/Validation';
import ValidationError from './lib/validation/ValidationError';

class AppValidation extends Validation {

  // That's how we can add custom validations.
  superLongPassword() {
    return this.validate((value, prop) => {
      const minLength = 500;
      if (value.length >= minLength) return;
      throw new ValidationError('superLongPassword', { minLength, prop });
    });
  }

}

export default function validate(json) {
  return new AppValidation(json);
}

// Super simple sync / async validation based on chriso/validator.js
import ValidationError from './ValidationError';
import isEmail from 'validator/lib/isEmail';
import trim from 'validator/lib/trim';

// Subclass to add custom validations.
class Validation {

  // JSON to be validated.
  constructor(object) {
    this.object = object;
    this.currentProp = null;
    this.promise = Promise.resolve();
  }

  validate(callback, { required } = {}) {
    const prop = this.currentProp;
    const value = this.object[prop];
    const object = this.object;
    this.promise = this.promise.then(() => {
      if (required && !this.isEmptyString(value)) return;
      callback(value, prop, object);
    });
    return this;
  }

  isEmptyString(value) {
    return !trim(value);
  }

  prop(prop) {
    this.currentProp = prop;
    return this;
  }

  required() {
    return this.validate((value, prop) => {
      throw new ValidationError('required', { prop });
    }, { required: true });
  }

  email() {
    return this.validate((value, prop) => {
      if (isEmail(value)) return;
      throw new ValidationError('email', { prop });
    });
  }

  simplePassword() {
    return this.validate((value, prop) => {
      // Password must be at least 6 characters.
      const minLength = 6;
      if (value.length >= minLength) return;
      throw new ValidationError('simplePassword', { prop, minLength });
    });
  }

}

export default Validation;

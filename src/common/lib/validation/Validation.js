// Super simple sync / async validation based on chriso/validator.js
import ValidationError from './ValidationError';
import validator from 'validator';

// Subclass to add custom validations.
export default class Validation {

  // JSON to be validated.
  constructor(object) {
    this._object = object;
    this._prop = null;
    this._validator = validator;
    this.promise = Promise.resolve();
  }

  validate(callback, { required } = {}) {
    const prop = this._prop;
    const value = this._object[prop];
    const object = this._object;
    this.promise = this.promise.then(() => {
      if (required && !this._isEmptyString(value)) return;
      callback(value, prop, object);
    });
    return this;
  }

  _isEmptyString(value) {
    return !this._validator.toString(value).trim();
  }

  prop(prop) {
    this._prop = prop;
    return this;
  }

  required() {
    return this.validate((value, prop) => {
      throw new ValidationError('required', { prop });
    }, { required: true });
  }

  email() {
    return this.validate((value, prop) => {
      if (this._validator.isEmail(value)) return;
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

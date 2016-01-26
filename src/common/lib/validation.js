// Simple serial sync/async chriso/validator.js wrapper with promises.
import ValidationError from './ValidationError';
import validator from 'validator';

export default class Validation {

  constructor(object) {
    this._object = object;
    this._prop = null;
    this._validator = validator;
    this.promise = Promise.resolve();
  }

  custom(callback, {required} = {}) {
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

  required(getRequiredMessage) {
    return this.custom((value, prop) => {
      const msg = getRequiredMessage
        ? getRequiredMessage(prop, value)
        : this.getRequiredMessage(prop, value);
      throw new ValidationError(msg, prop);
    }, {required: true});
  }

  getRequiredMessage(prop) {
    return `Please fill out '${prop}' field.`;
  }

  email() {
    return this.custom((value, prop) => {
      if (this._validator.isEmail(value)) return;
      throw new ValidationError(
        this.getEmailMessage(prop, value),
        prop
      );
    });
  }

  getEmailMessage() {
    return `Email address is not valid.`;
  }

  simplePassword() {
    return this.custom((value, prop) => {
      const minLength = 5;
      if (value.length >= minLength) return;
      throw new ValidationError(
        this.getSimplePasswordMessage(minLength),
        prop
      );
    });
  }

  getSimplePasswordMessage(minLength) {
    return `Password must contain at least ${minLength} characters.`;
  }

}

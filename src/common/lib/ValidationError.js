import {BaseError} from 'make-error';

export default class ValidationError extends BaseError {

  // prop associates error with form field name.
  constructor(message, prop) {
    super();
    this.message = message;
    this.prop = prop;
  }

}

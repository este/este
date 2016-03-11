import { BaseError } from 'make-error';

export default class ValidationError extends BaseError {

  constructor(name, params = {}) {
    super(`ValidationError: ${JSON.stringify({ name, params })}`);
    this.name = name;
    this.params = params;
  }

}

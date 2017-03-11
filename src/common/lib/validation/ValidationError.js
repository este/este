// @flow
import { BaseError } from 'make-error';

class ValidationError extends BaseError {
  name: string;
  params: Object;

  static isInvalid(error: Error, prop: string) {
    if (!(error instanceof ValidationError)) return false;
    return error.params.prop === prop;
  }

  constructor(name: string, params: Object = {}) {
    super(`ValidationError: ${JSON.stringify({ name, params })}`);
    this.name = name;
    this.params = params;
  }
}

export default ValidationError;

// @flow
import type { FormError } from '../types';
import isEmail from 'validator/lib/isEmail';
import { Observable } from 'rxjs/Observable';

type RequiredValidationError = {
  type: 'required',
  name: null | 'agree', // Name is for custom validation messages.
};
type MinLengthValidationError = { type: 'minLength', minLength: number };
type MaxLengthValidationError = { type: 'maxLength', maxLength: number };
type EmailValidationError = { type: 'email' };

export type ValidationError =
  | RequiredValidationError
  | MinLengthValidationError
  | MaxLengthValidationError
  | EmailValidationError;

const hasValue = (value: mixed) => {
  if (Array.isArray(value)) return value.length > 0;
  switch (typeof value) {
    case 'string':
      return value.length > 0;
    case 'number':
      return value != null;
    case 'boolean':
      return value;
    default:
      return !!value;
  }
};

export const required = (
  name: $PropertyType<RequiredValidationError, 'name'> = null,
) => (value: string): ?RequiredValidationError => {
  if (hasValue(value)) return null;
  return { type: 'required', name };
};

export const minLength = (
  minLength: $PropertyType<MinLengthValidationError, 'minLength'> = 2,
) => (value: string | Array<any>): ?MinLengthValidationError => {
  if (!hasValue(value)) return null;
  if (value.length >= minLength) return null;
  return { type: 'minLength', minLength };
};

export const maxLength = (
  maxLength: $PropertyType<MaxLengthValidationError, 'maxLength'> = 256,
) => (value: string | Array<any>): ?MaxLengthValidationError => {
  if (!hasValue(value)) return null;
  if (value.length <= maxLength) return null;
  return { type: 'maxLength', maxLength };
};

export const email = () => (value: string): ?EmailValidationError => {
  if (!hasValue(value)) return null;
  if (isEmail(value)) return null;
  return { type: 'email' };
};

// Simple validation. Show only one validation error at time.
// Example:
// validate(user, {
//   name: [required(), minLength(), maxLength()],
//   email: [email(), maxLength()],
//   isAnarchist: [required('agree')],
// });
// Why mixed type?
// https://flow.org/en/docs/types/mixed
// https://twitter.com/estejs/status/875454437803704320
const validate = <O: { [prop: string]: mixed }>(
  object: O,
  validators: { [prop: $Keys<O>]: Array<(any) => ?ValidationError> },
) => {
  for (const prop in validators) {
    const value = object[prop];
    const propValidators = validators[prop];
    for (const validator of propValidators) {
      const validationError = validator(value);
      if (validationError) {
        const validationErrors = { [prop]: validationError };
        return Observable.throw(({ validationErrors }: FormError<any>));
      }
    }
  }
  return Observable.of(object);
};

export default validate;

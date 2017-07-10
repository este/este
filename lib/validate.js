// @flow
import type { ValidationErrors } from '../types';
import isEmail from 'validator/lib/isEmail';

// ValidationError should be generic as much as possible for easy translation.
type Required = { type: 'required' };
type RequiredAgree = { type: 'requiredAgree' };
type MinLength = { type: 'minLength', minLength: number };
type MaxLength = { type: 'maxLength', maxLength: number };
type Email = { type: 'email' };
type AlreadyExists = { type: 'alreadyExists' };

export type ValidationError =
  | Required
  | RequiredAgree
  | MinLength
  | MaxLength
  | Email
  | AlreadyExists;

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

export const required = () => (value: string): ?Required => {
  if (hasValue(value)) return null;
  return { type: 'required' };
};

export const requiredAgree = () => (value: string): ?RequiredAgree => {
  if (hasValue(value)) return null;
  return { type: 'requiredAgree' };
};

export const minLength = (
  minLength: $PropertyType<MinLength, 'minLength'> = 2,
) => (value: string | Array<any>): ?MinLength => {
  if (!hasValue(value)) return null;
  if (value.length >= minLength) return null;
  return { type: 'minLength', minLength };
};

export const maxLength = (
  maxLength: $PropertyType<MaxLength, 'maxLength'> = 256,
) => (value: string | Array<any>): ?MaxLength => {
  if (!hasValue(value)) return null;
  if (value.length <= maxLength) return null;
  return { type: 'maxLength', maxLength };
};

export const email = () => (value: string): ?Email => {
  if (!hasValue(value)) return null;
  if (isEmail(value)) return null;
  return { type: 'email' };
};

// Simple typed validation. Show only one validation error at time.
// All validations (except required) all optional by default.
// Example:
// validate(user, {
//   name: [required(), minLength(), maxLength()],
//   email: [email(), maxLength()],
//   isAnarchist: [requiredAgree())],
// });
// Why mixed type?
// https://flow.org/en/docs/types/mixed
// https://twitter.com/estejs/status/875454437803704320
const validate = <O: { +[prop: string]: mixed }>(
  object: O,
  validators: { [prop: $Keys<O>]: Array<(*) => ?ValidationError> },
): ?ValidationErrors<O> => {
  for (const prop in validators) {
    const value = object[prop];
    const propValidators = validators[prop];
    for (const validator of propValidators) {
      const validationError = validator(value);
      if (validationError) {
        return { [prop]: validationError };
      }
    }
  }
  return null;
};

export default validate;

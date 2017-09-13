// @flow
import isEmail from 'validator/lib/isEmail';

// Simple and typed validation. Returns the first validation error.
// All validations (except required) are optional by default.

// Validation errors should be as generic as possible for easy translation.
type AlreadyExists = { type: 'alreadyExists' };
type Email = { type: 'email' };
type MaxLength = { type: 'maxLength', maxLength: number };
type MinLength = { type: 'minLength', minLength: number };
type Required = { type: 'required' };
type RequiredAgree = { type: 'requiredAgree' };
type WrongPassword = { type: 'wrongPassword' };

export type ValidationError =
  | AlreadyExists
  | Email
  | MaxLength
  | MinLength
  | Required
  | RequiredAgree
  | WrongPassword;

export type ValidationErrors<T> = { [key: $Keys<T>]: ?ValidationError };

// Why mixed type?
// https://flow.org/en/docs/types/mixed
// https://twitter.com/estejs/status/875454437803704320
export const validate = <O: { +[prop: string]: mixed }>(
  object: O,
  validators: { [prop: $Keys<O>]: Array<(*) => ?ValidationError> },
): ValidationErrors<O> => {
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
  return {};
};

export const isValid = (validationErrors: Object) =>
  Object.keys(validationErrors).length === 0;

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
  maxLength: $PropertyType<MaxLength, 'maxLength'> = 140, // Like Twitter.
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

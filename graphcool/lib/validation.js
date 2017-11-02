// @flow
import isEmail from 'validator/lib/isEmail';

// This file must be placed in the graphcool directory because graphcool deploy
// does not build source files.
// We use comment types because graphcool uses TypeScript.
// https://flow.org/en/docs/types/comments

/*::
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

export type ValidationErrors<T> = {
  [key: $Keys<T>]: ?ValidationError,
};

type Validator<T> = (value: T) => ?ValidationError;
*/

export const shortText /*: Validator<string> */ = value => {
  if (value.length === 0) return { type: 'required' };
  if (value.length < 3) return { type: 'minLength', minLength: 3 };
  if (value.length > 140) return { type: 'maxLength', maxLength: 140 };
};

export const email /*: Validator<string> */ = value => {
  if (value.length === 0) return { type: 'required' };
  if (!isEmail(value)) return { type: 'email' };
};

export const password /*: Validator<string> */ = value => {
  if (value.length === 0) return { type: 'required' };
  if (value.length < 6) return { type: 'minLength', minLength: 6 };
  if (value.length > 1024) return { type: 'maxLength', maxLength: 1024 };
};

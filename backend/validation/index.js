// @flow
import isEmail from 'validator/lib/isEmail';

// Your app is the validation library you are looking for.

export type ValidationError =
  | { type: 'required' }
  | { type: 'email' }
  | { type: 'minLength', minLength: number }
  | { type: 'maxLength', maxLength: number }
  | { type: 'alreadyExists' }
  | { type: 'notExists' }
  | { type: 'invalid' }
  | { type: 'notAuthorized' }
  | { type: 'unknownError', message: string };

export type ValidationErrors<Variables> = {
  [prop: $Keys<Variables>]: ?ValidationError,
};

// Helpers.

const validateEmail = email => {
  if (email.length === 0) return { type: 'required' };
  if (!isEmail(email)) return { type: 'email' };
};

const validatePassword = password => {
  if (password.length === 0) return { type: 'required' };
  if (password.length < 6) return { type: 'minLength', minLength: 6 };
  if (password.length > 1024) return { type: 'maxLength', maxLength: 1024 };
};

const validateShortText = shortText => {
  if (shortText.length === 0) return { type: 'required' };
  if (shortText.length < 3) return { type: 'minLength', minLength: 3 };
  if (shortText.length > 140) return { type: 'maxLength', maxLength: 140 };
};

// Validations.

type Validate<Variables> = (
  variables: Variables,
) => ?ValidationErrors<Variables>;

export const validateEmailPassword: Validate<{
  email: string,
  password: string,
}> = variables => {
  const email = validateEmail(variables.email);
  if (email) return { email };
  const password = validatePassword(variables.password);
  if (password) return { password };
};

export const validateNewWeb: Validate<{
  name: string,
}> = variables => {
  const name = validateShortText(variables.name);
  if (name) return { name };
};

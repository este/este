// @flow
import isEmail from 'validator/lib/isEmail';

// Your app is the validation library you are looking for.

export type ValidationError =
  // Validated elsewhere.
  | { type: 'alreadyExists' }
  | { type: 'notExists' }
  | { type: 'wrongPassword' }
  | { type: 'notAuthorized' }
  | { type: 'unknownError', message: string }
  | { type: 'requestFailed' }
  // Validated here.
  | { type: 'trim' }
  | { type: 'required' }
  | { type: 'email' }
  | { type: 'minLength', minLength: number }
  | { type: 'maxLength', maxLength: number };

export type ValidationErrors<Variables> = {
  [prop: $Keys<Variables>]: ?ValidationError,
};

// Helpers.

// Texts with trailing whitespaces are bad for user experience.
// But manual trimming everywhere is bad for developer experience.
// If you really care about UX, trim texts explicitly.
// But validateTrim is good enough for almost all cases.
const validateTrim = validate => text =>
  text !== text.trim() ? { type: 'trim' } : validate(text);

const validateEmail = validateTrim(email => {
  if (email.length === 0) return { type: 'required' };
  if (!isEmail(email)) return { type: 'email' };
});

const validatePassword = validateTrim(password => {
  if (password.length === 0) return { type: 'required' };
  if (password.length < 6) return { type: 'minLength', minLength: 6 };
  if (password.length > 1024) return { type: 'maxLength', maxLength: 1024 };
});

const validateShortText = validateTrim(shortText => {
  if (shortText.length === 0) return { type: 'required' };
  if (shortText.length < 3) return { type: 'minLength', minLength: 3 };
  if (shortText.length > 140) return { type: 'maxLength', maxLength: 140 };
});

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

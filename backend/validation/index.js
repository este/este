// @flow
import isEmail from 'validator/lib/isEmail';

// Your app is the validation library you are looking for.

type NeedsCustomLogic =
  | { type: 'alreadyExists' }
  | { type: 'notExists' }
  | { type: 'invalid' }
  | { type: 'notAuthorized' }
  | { type: 'unknownError', message: string };

export type ValidationError =
  | NeedsCustomLogic
  | { type: 'required' }
  | { type: 'email' }
  | { type: 'minLength', minLength: number }
  | { type: 'maxLength', maxLength: number };

export type ValidationErrors<Variables> = {
  [prop: $Keys<Variables>]: ?ValidationError,
};

// Should we trim user string inputs or not? Yep, trim them all! Because of UX.
// But where to place the trim logic? Yep, into a validation. Here.
const trim = validate => string => validate(string.trim());

const validateEmail = trim(email => {
  if (email.length === 0) return { type: 'required' };
  if (!isEmail(email)) return { type: 'email' };
});

const validatePassword = trim(password => {
  if (password.length === 0) return { type: 'required' };
  if (password.length < 6) return { type: 'minLength', minLength: 6 };
  if (password.length > 1024) return { type: 'maxLength', maxLength: 1024 };
});

const validateShortText = trim(shortText => {
  if (shortText.length === 0) return { type: 'required' };
  if (shortText.length < 3) return { type: 'minLength', minLength: 3 };
  if (shortText.length > 140) return { type: 'maxLength', maxLength: 140 };
});

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

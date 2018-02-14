// @flow
const isEmail = require('validator/lib/isEmail');

// Your app is the validation library you are looking for.

// TODO: Optional validation. Something like:
// const validateEmailOptional = optional(validateEmail)

// Validate one by one, aka fail on the first error.
const chain = (...validators) => value => {
  for (const validator of validators) {
    const error = validator(value);
    if (error != null) return error;
  }
};

// How to trim, the ultimate guide:
// 1. Use validateTrim to ensure a value is valid.
// 2. For the better UX, trim values before the validation.
// 3. A client can trim automatically on validateTrim error.
const validateTrim = value => {
  if (value !== value.trim()) return { type: 'trim' };
};

// Always trim before length check.
const validateLength = (predicate, error) =>
  chain(validateTrim, value => {
    if (predicate(value)) return error;
  });

// Everything should be required by default.
const validateRequired = validateLength(value => value.length === 0, {
  type: 'required',
});

const validateEmail = chain(validateRequired, value => {
  if (!isEmail(value)) return { type: 'email' };
});

const validateRange = (minLength, maxLength) =>
  chain(
    validateRequired,
    validateLength(value => value.length < minLength, {
      type: 'minLength',
      minLength,
    }),
    validateLength(value => value.length > maxLength, {
      type: 'maxLength',
      maxLength,
    }),
  );

const validatePassword = validateRange(6, 1024);
const validateShortText = validateRange(3, 140);

// Validations.

/*::
import type { Error, Errors } from './error';

type Validate<Variables> = (
  variables: Variables,
) => ?Errors<Variables>;
*/

const validateEmailPassword /*: Validate<{
  email: string,
  password: string,
}> */ = variables => {
  const email = validateEmail(variables.email);
  if (email) return { email };
  const password = validatePassword(variables.password);
  if (password) return { password };
};

const validateNewWeb /*: Validate<{
  name: string,
}> */ = variables => {
  const name = validateShortText(variables.name);
  if (name) return { name };
};

module.exports = {
  validateEmailPassword,
  validateNewWeb,
};

// @flow
const isEmail = require('validator/lib/isEmail');
/*::
import type { Error, Errors } from './error';
type Validate<Variables> = (variables: Variables) => ?Errors<Variables>;
*/

// Your app is the validation library you are looking for.
// TODO: optional(emailValidator)

const failOnFirst = (...validators) => value => {
  for (const validator of validators) {
    const error = validator(value);
    if (error != null) return error;
  }
};

// How to trim, the ultimate guide:
// 1. Use trimValidator to ensure a value is valid for the other validations.
// 2. For better UX, we can trim values in UI manually, still, 1. is the must.
const trimValidator = value => {
  if (typeof value !== 'string') return;
  if (value !== value.trim()) return { type: 'trim' };
};

const createLengthValidator = (predicate, error) =>
  failOnFirst(trimValidator, value => {
    if (predicate(value)) return error;
  });

const requiredValidator = createLengthValidator(value => value.length === 0, {
  type: 'required',
});

const emailValidator = failOnFirst(requiredValidator, value => {
  if (!isEmail(value)) return { type: 'email' };
});

const createRangeValidator = (minLength, maxLength) =>
  failOnFirst(
    requiredValidator,
    createLengthValidator(value => value.length < minLength, {
      type: 'minLength',
      minLength,
    }),
    createLengthValidator(value => value.length > maxLength, {
      type: 'maxLength',
      maxLength,
    }),
  );

const passwordValidator = createRangeValidator(6, 1024);

const shortTextValidator = createRangeValidator(3, 140);

// Exported validations.

const validateEmailPassword /*: Validate<{
  email: string,
  password: string,
}> */ = variables => {
  const email = emailValidator(variables.email);
  if (email) return { email };
  const password = passwordValidator(variables.password);
  if (password) return { password };
};

const validateNewWeb /*: Validate<{
  name: string,
}> */ = variables => {
  const name = shortTextValidator(variables.name);
  if (name) return { name };
};

module.exports = {
  validateEmailPassword,
  validateNewWeb,
};

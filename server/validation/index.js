// @flow
const isEmail = require('validator/lib/isEmail');

/*::
import type { CreateWebInput } from '../../components/__generated__/CreateWebMutation.graphql'
*/

// TODO: Optional via higher order function probably.

// type? nebo prejmenovat?

const validateNoTrailingSpaces = (value /*: string */) =>
  value !== value.trim() && 'NO_TRAILING_SPACES';

const validateRequired = (value /*: string */) =>
  validateNoTrailingSpaces(value) || (value.length === 0 && 'REQUIRED');

const validateMax140Chars = (value /*: string */) =>
  validateRequired(value) || (value.length > 140 && 'MAX_140_CHARS');

const validateShortRequiredString = (value /*: string */) => {
  return validateMax140Chars(value) || null;
};

// validateRequired(value) || (value.length > 140 && 'MAX_140_CHARS');

module.exports = {
  // jinak pojmenovat? noTrailingSpacesValidator?
  // validateNoTrailingSpaces,
  // validateRequired,
  validateShortRequiredString,
  // validateCreateWeb,
};

// TODO: Remove.

/*::
import type { Error, Errors } from '../error';
type Validate<Variables> = (variables: Variables) => ?Errors<Variables>;
*/

// Your app is the validation library you are looking for.
// TODO: optional(emailValidator)

const failOnFirst = (...validators) => value => {
  for (let i = 0; i < validators.length; i++) {
    const error = validators[i](value);
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

// TODO: It should use generated types.
const validateNewWeb /*: Validate<{
  name: string,
}> */ = variables => {
  const name = shortTextValidator(variables.name);
  if (name) return { name };
};

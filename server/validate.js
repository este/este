// @flow
const isEmail = require('validator/lib/isEmail');

const noTrailingSpaces = value =>
  value !== value.trim() ? 'NO_TRAILING_SPACES' : null;

const required = value =>
  noTrailingSpaces(value) || (value.length === 0 ? 'REQUIRED' : null);

// const min5chars = value =>
//   required(value) || (value.length < 3 ? 'MIN_5_CHARS' : null);

// Export only strict enough validations.

const shortRequiredString = (value /*: string */) =>
  required(value) || (value.length > 140 ? 'MAX_140_CHARS' : null);

// const shortRequiredStringMin3Chars = (value /*: string */) =>
//   shortRequiredString(value) || min5chars(value);

module.exports = {
  shortRequiredString,
};

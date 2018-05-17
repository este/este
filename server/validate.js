// @flow
const isEmail = require('validator/lib/isEmail');

const validateNoTrailingSpaces = (value /*: string */) =>
  value !== value.trim() && 'NO_TRAILING_SPACES';

const validateRequired = (value /*: string */) =>
  validateNoTrailingSpaces(value) || (value.length === 0 && 'REQUIRED');

const validateMax140Chars = (value /*: string */) =>
  validateRequired(value) || (value.length > 140 && 'MAX_140_CHARS');

const validateShortRequiredString = (value /*: string */) => {
  return validateMax140Chars(value) || null;
};

module.exports = {};

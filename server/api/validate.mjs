// @flow
import isEmail from 'validator/lib/isEmail';

// The most simple and universal validation ever. Note STRING_CONSTANTS are not
// magic, Flow checks their usage.

const noTrailingSpaces = value =>
  value !== value.trim() ? 'NO_TRAILING_SPACES' : null;

// Note we have to check trailing spaces before length check. I suppose this
// is the best pattern. Teach user instead of magic trimming everywhere. UI can
// trim automatically on NO_TRAILING_SPACES error where appropriate.
const required = value =>
  noTrailingSpaces(value) || (value.length === 0 ? 'REQUIRED' : null);

const min5chars = value =>
  required(value) || (value.length < 5 ? 'MIN_5_CHARS' : null);

const max140chars = value =>
  required(value) || (value.length > 140 ? 'MAX_140_CHARS' : null);

const max1024chars = value =>
  required(value) || (value.length > 1024 ? 'MAX_1024_CHARS' : null);

// Export only strict enough validations.

export const shortString = (value /*: string */) => max140chars(value);

export const shortStringMin5Chars = (value /*: string */) =>
  min5chars(value) || max140chars(value);

export const longString = (value /*: string */) => max1024chars(value);

export const longStringMin5Chars = (value /*: string */) =>
  min5chars(value) || max1024chars(value);

export const email = (value /*: string */) =>
  required(value) || (!isEmail(value) ? 'EMAIL' : null);

// @flow
import isEmail from 'validator/lib/isEmail';

// The most simple and universal validation ever.
// Note STRING_CONSTANTS are not magic, Flow checks their usage.

const required = value => (value.length === 0 ? 'REQUIRED' : null);

const min5Chars = value =>
  required(value) || (value.length < 5 ? 'MIN_5_CHARS' : null);

// Export only strict enough (with max) validations.

export const email = (value /*: string */) =>
  required(value) || (!isEmail(value) ? 'EMAIL' : null);

export const max140Chars = (value /*: string */) =>
  required(value) || (value.length > 140 ? 'MAX_140_CHARS' : null);

export const max140Min5Chars = (value /*: string */) =>
  max140Chars(value) || min5Chars(value);

export const max1024Chars = (value /*: string */) =>
  required(value) || (value.length > 1024 ? 'MAX_1024_CHARS' : null);

export const max1024Min5Chars = (value /*: string */) =>
  max1024Chars(value) || min5Chars(value);

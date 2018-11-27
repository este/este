// @flow
import isEmail from 'validator/lib/isEmail';
import isURL from 'validator/lib/isURL';

// Helpers

function required(value) {
  return value.length === 0 ? 'REQUIRED' : null;
}

function min5(value) {
  return value.length < 5 ? 'MIN_5_CHARS' : null;
}

function max140(value) {
  return value.length > 140 ? 'MAX_140_CHARS' : null;
}

function max1024Chars(value) {
  return value.length > 1024 ? 'MAX_1024_CHARS' : null;
}

// Validates

export function email(value: string) {
  return required(value) || (!isEmail(value) ? 'EMAIL' : null);
}

export function url(value: string) {
  return required(value) || (!isURL(value) ? 'URL' : null);
}

export function password(value: string) {
  return required(value) || min5(value) || max1024Chars(value);
}

export function max140Chars(value: string) {
  return required(value) || max140(value);
}

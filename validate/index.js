// @flow
import isEmail from 'validator/lib/isEmail';

function required(value) {
  return value.length === 0 ? 'REQUIRED' : null;
}

function min5(value) {
  return value.length < 5 ? 'MIN_5_CHARS' : null;
}

function max140(value) {
  return value.length > 140 ? 'MAX_140_CHARS' : null;
}

function max1024(value) {
  return value.length > 1024 ? 'MAX_1024_CHARS' : null;
}

export function email(value: string) {
  return required(value) || (!isEmail(value) ? 'EMAIL' : null);
}

export function min5Max140(value: string) {
  return required(value) || min5(value) || max140(value);
}

export function min5Max1024(value: string) {
  return required(value) || min5(value) || max1024(value);
}

export function password(value: string) {
  return min5Max1024(value);
}

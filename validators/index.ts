import isEmail from 'validator/lib/isEmail';
// import isURL from 'validator/lib/isURL';

// Helpers.

const required = (value: string) => value.length === 0 && 'REQUIRED';
const email = (value: string) => !isEmail(value) && 'EMAIL';
const min5 = (value: string) => value.length < 5 && 'MIN_5_CHARS';
const max1024 = (value: string) => value.length > 1024 && 'MAX_1024_CHARS';
const max140 = (value: string) => value.length > 140 && 'MAX_140_CHARS';

// Fields.

export const validateEmail = (value: string) =>
  required(value) || email(value) || null;

export const validatePassword = (value: string) =>
  required(value) || min5(value) || max1024(value) || null;

export const validateMax140Chars = (value: string) =>
  required(value) || max140(value) || null;

// export const validateUrl = (value: string) =>
//   required(value) || (!isURL(value) ? 'URL' : undefined);

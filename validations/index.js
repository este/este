// @flow
import isEmail from 'validator/lib/isEmail';
// TOHLE? imho komplet zbytecne!
import type {
  AuthInput,
  CreateWebInput,
  SetPageTitleInput,
  SetWebNameInput,
} from '../server/api/__generated__/api.graphql';

// is je blbost, je to validate.required, ok
export function required(value: string) {
  return value.length === 0 ? 'REQUIRED' : null;
}

function min5Chars(value) {
  return required(value) || (value.length < 5 ? 'MIN_5_CHARS' : null);
}

const email = (value: string) =>
  required(value) || (!isEmail(value) ? 'EMAIL' : null);

const max140Chars = (value: string) =>
  required(value) || (value.length > 140 ? 'MAX_140_CHARS' : null);

// const max140Min5Chars = (value: string) =>
//   max140Chars(value) || min5Chars(value);

const max1024Chars = (value: string) =>
  required(value) || (value.length > 1024 ? 'MAX_1024_CHARS' : null);

const max1024Min5Chars = (value: string) =>
  max1024Chars(value) || min5Chars(value);

export const validateAuth = (input: AuthInput) => {
  const emailError = email(input.email);
  if (emailError) return { email: emailError };
  const password = max1024Min5Chars(input.password);
  if (password) return { password };
};

export const validateCreateWeb = (input: CreateWebInput) => {
  const name = max140Chars(input.name);
  if (name) return { name };
  const pageTitle = max140Chars(input.pageTitle);
  if (pageTitle) return { pageTitle };
};

export const validateSetPageTitle = (input: SetPageTitleInput) => {
  const title = max140Chars(input.title);
  if (title) return { title };
};

export const validateSetWebName = (input: SetWebNameInput) => {
  const name = max140Chars(input.name);
  if (name) return { name };
};

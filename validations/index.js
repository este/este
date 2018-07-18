// @flow
import isEmail from 'validator/lib/isEmail';
import type {
  AuthInput,
  CreateWebInput,
  SetPostNameInput,
  SetWebNameInput,
} from '../server/api/__generated__/api.graphql';

// The most simple and universal validation ever.
// Note STRING_CONSTANTS are not magic, Flow checks their usage.

const required = value => (value.length === 0 ? 'REQUIRED' : null);

const min5Chars = value =>
  required(value) || (value.length < 5 ? 'MIN_5_CHARS' : null);

const email = (value: string) =>
  required(value) || (!isEmail(value) ? 'EMAIL' : null);

const max140Chars = (value: string) =>
  required(value) || (value.length > 140 ? 'MAX_140_CHARS' : null);

const max140Min5Chars = (value: string) =>
  max140Chars(value) || min5Chars(value);

const max1024Chars = (value: string) =>
  required(value) || (value.length > 1024 ? 'MAX_1024_CHARS' : null);

const max1024Min5Chars = (value: string) =>
  max1024Chars(value) || min5Chars(value);

export const validateAuth = (input: AuthInput) => {
  const email_ = email(input.email);
  if (email_) return { email: email_ };
  const password = max1024Min5Chars(input.password);
  if (password) return { password };
};

export const validateCreateWeb = (input: CreateWebInput) => {
  const name = max140Chars(input.name);
  if (name) return { name };
  const postName = max140Chars(input.postName);
  if (postName) return { postName };
};

export const validateSetPostName = (input: SetPostNameInput) => {
  const name = max140Chars(input.name);
  if (name) return { name };
};

export const validateSetWebName = (input: SetWebNameInput) => {
  const name = max140Chars(input.name);
  if (name) return { name };
};

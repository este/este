import { enumType } from 'nexus';

// https://itnext.io/the-definitive-guide-to-handling-graphql-errors-e0c58b52b5e1

export const EmailError = enumType({
  name: 'EmailError',
  members: ['REQUIRED', 'EMAIL', 'ALREADY_EXISTS', 'NOT_EXISTS'],
});

export const URLError = enumType({
  name: 'URLError',
  members: ['REQUIRED', 'URL'],
});

export const PasswordError = enumType({
  name: 'PasswordError',
  members: ['REQUIRED', 'MIN_5_CHARS', 'MAX_1024_CHARS', 'WRONG_PASSWORD'],
});

export const Max140CharsError = enumType({
  name: 'Max140CharsError',
  members: ['REQUIRED', 'MAX_140_CHARS'],
});

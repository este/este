// @flow
/* eslint-disable import/prefer-default-export */

// TODO: Tohle je komplet spatne. Zrusit

// So here is a thing. We have only one Error type in the app.
// Note, it overrides JavaScript Error when imported. That's fine.
// https://github.com/facebook/flow/blob/v0.64.0/lib/core.js#L439

/*::
import type { PayloadError } from 'react-relay'

// TODO: To rozdeleni je imho blbost, ok
type DomainError =
  | { type: 'alreadyExists' }
  | { type: 'notExists' }
  | { type: 'wrongPassword' }
  | { type: 'notAuthorized' }
  | { type: 'requestFailed' }
  | { type: 'unknown', message: string };

type ValidationError =
  | { type: 'trim' }
  | { type: 'required' }
  | { type: 'email' }
  | { type: 'minLength', minLength: number }
  | { type: 'maxLength', maxLength: number };

export type Error = DomainError | ValidationError;

export type Errors<T> = {
  [prop: $Keys<T>]: ?Error,
};

// Server can return one or many errors. For example:
// { type: 'notAuthorized' }; // when user has no rights
// { email: { type: 'alreadyExists' } }; // when type prop value already exists
// Note we can safely distinguish them via type === 'string'.
export type ServerError = Error | Errors<Object>;

*/

export const parsePayloadErrors = (
  payloadErrors /*: Array<PayloadError> */,
) => {
  let errors = {};
  let error = null;

  payloadErrors.forEach(payloadError => {
    // GraphQL spec plans typed errors, meanwhile we use JSON.
    let parsedError;
    // Try parse, otherwise it's not a JSON.
    // TODO: https://github.com/este/este/issues/1488
    try {
      parsedError = JSON.parse(payloadError.message);
    } catch (_) {
      // Server returned own string error.
      // TODO: Investigate why then make the code more explicit.
      const requestFailed =
        payloadError.message.indexOf(
          'failed, reason: getaddrinfo ENOTFOUND',
        ) !== -1;
      error = requestFailed
        ? { type: 'requestFailed' }
        : { type: 'unknown', message: payloadError.message };
      return;
    }
    const isOneError = typeof parsedError.type === 'string';
    if (isOneError) {
      error = parsedError;
    } else {
      errors = { ...errors, ...parsedError };
    }
  });

  return { errors, error };
};

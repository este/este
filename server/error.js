// @flow

// So here is a thing. We have only one Error type in the app.
// It's union type for all various different errors.
// Note, it overrides JavaScript Error when imported. That's fine.
// https://github.com/facebook/flow/blob/v0.64.0/lib/core.js#L439
// http://blog.ploeh.dk/2017/01/03/decoupling-application-errors-from-domain-models

/*::
import type { ValidationError } from './validation';

type DomainError =
  | { type: 'alreadyExists' }
  | { type: 'notExists' }
  | { type: 'wrongPassword' }
  | { type: 'notAuthorized' }
  | { type: 'requestFailed' }
  | { type: 'unknownError', message: string };

export type Error = DomainError | ValidationError;

export type Errors<T> = {
  [prop: $Keys<T>]: ?Error,
};

// Server can return one or many errors. For example:
// { type: 'notAuthorized' }; // when user has no rights
// { type: { type: 'alreadyExists' } }; // when type prop value already exists
// Note we can safely distinguish them via type === 'string'.
export type ServerError = Error | Errors<*>;

type SerializedServerError = string;

// TODO: Use Relay 1.5 type when released.
export type PayloadErrors = Array<{
  message: SerializedServerError,
}>;
*/

export const parsePayloadErrors = (payloadErrors: PayloadErrors) => {
  let errors = {};
  let error = null;

  payloadErrors.forEach(payloadError => {
    // GraphQL spec plans typed errors, meanwhile we use JSON.
    let parsedError;
    // Try parse, otherwise it's not a JSON.
    // TODO: There must be a better way.
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
        : { type: 'unknownError', message: payloadError.message };
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

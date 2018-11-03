// @flow
import * as React from 'react';
import type { PayloadError } from 'react-relay';

export type ContextError = PayloadError | Error;
export type DispatchError = (error: ContextError) => void;

const ErrorContext = React.createContext<{
  error: ?ContextError,
  dispatchError: DispatchError,
}>({
  error: null,
  // eslint-disable-next-line no-unused-vars
  dispatchError: (error: ContextError) => {},
});

export default ErrorContext;

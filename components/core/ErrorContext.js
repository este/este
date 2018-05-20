// @flow
import * as React from 'react';
import type { PayloadError } from 'react-relay';

export type AppError = PayloadError | Error;
export type DispatchError = (error: AppError) => void;

const ErrorContext = React.createContext({
  // Note explicitly added types, so createContext can infer them.
  error: (null: ?AppError),
  // eslint-disable-next-line no-unused-vars
  dispatchError: (error: AppError) => {},
});

export default ErrorContext;

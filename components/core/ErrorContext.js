// @flow
import * as React from 'react';
import type { PayloadError } from 'react-relay';

export type AppError = PayloadError | Error;

const ErrorContext = React.createContext({
  error: (null: ?AppError),
  // eslint-disable-next-line no-unused-vars
  dispatchError: (error: AppError) => {},
});

export default ErrorContext;

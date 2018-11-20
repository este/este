// @flow
import * as React from 'react';
import type { PayloadError } from 'react-relay';

export type AppError = PayloadError | Error;
export type DispatchAppError = AppError => void;

const ErrorContext = React.createContext<{
  appError: ?AppError,
  dispatchAppError: DispatchAppError,
}>({
  appError: null,
  // eslint-disable-next-line no-unused-vars
  dispatchAppError: AppError => {},
});

export default ErrorContext;

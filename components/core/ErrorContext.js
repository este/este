// @flow
import * as React from 'react';
import type { Error } from '../../server/error';

const ErrorContext = React.createContext({
  error: (null: ?Error),
  showError: (error: Error) => {},
});

export default ErrorContext;

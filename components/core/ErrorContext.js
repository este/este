// @flow
import * as React from 'react';
import type { Error } from '../../server/error';

const ErrorContext = React.createContext({
  error: (null: ?Error),
  // eslint-disable-next-line no-unused-vars
  dispatchError: (error: Error) => {},
});

export default ErrorContext;

// @flow
import App from './App';
import NotFoundPage from './NotFoundPage';
import React from 'react';
import SignInPage from '../auth/SignInPage';

type ErrorProps = {
  error: Object,
};

const renderError = ({ error }: ErrorProps) => {
  switch (error.status) {
    case 404:
      return <App><NotFoundPage /></App>;
    case 401:
      return <App><SignInPage /></App>;
    case 500:
      console.error('Yay', error); // eslint-disable-line no-console
      // TODO: Improve it. Add link to root etc.
      return (
        <div>
          <h1>500 error</h1>
          <p>Something went wrong</p>
        </div>
      );
    default:
      return null;
  }
};

export default renderError;

// @flow
import App from './App';
import NotFoundPage from './NotFoundPage';
import React from 'react';

const NotFound = () => (
  <App>
    <NotFoundPage />
  </App>
);

const Error = () => (
  <div>
    <h1>500 error</h1>
    <p>Something went wrong</p>
  </div>
);

type ErrorProps = {
  error: { status: number },
};

const renderError = ({ error }: ErrorProps) => {
  if (error.status === 404) {
    return <NotFound />;
  }
  console.error('Yay', error); // eslint-disable-line no-console
  return <Error />;
};

export default renderError;

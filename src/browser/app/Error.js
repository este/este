// @flow
import React from 'react';

type ErrorProps = {
  error: { status: number },
};

// TODO: Move not found here, explain why.
const Error = ({ error }: ErrorProps) => (
  <div>
    {error.status === 404 ? 'Not found' : 'Error'}
  </div>
);

export default Error;

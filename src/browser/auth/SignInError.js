// @flow
import type { State } from '../../common/types';
import React from 'react';
import errorMessages from '../../common/auth/errorMessages';
import firebaseMessages from '../../common/auth/firebaseMessages';
import { FormattedMessage } from 'react-intl';
import { Message } from '../../common/components';
import { connect } from 'react-redux';

const getMessage = error =>
  errorMessages[error.name] || firebaseMessages[error.name] || error.toString();

const SignInError = ({ error }) => {
  if (!error) return null;
  const message = getMessage(error);

  return (
    <Message backgroundColor="danger">
      {typeof message !== 'string'
        ? <FormattedMessage {...message} values={error.params} />
        : error.toString()}
    </Message>
  );
};

export default connect((state: State) => ({
  error: state.auth.error,
}))(SignInError);

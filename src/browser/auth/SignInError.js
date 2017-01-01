// @flow
import type { State } from '../../common/types';
import React from 'react';
import errorMessages from '../../common/auth/errorMessages';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { firebaseMessages } from '../../common/lib/redux-firebase';
import {
  Message,
} from '../app/components';

const getMessage = error =>
  errorMessages[error.name] ||
  firebaseMessages[error.name] ||
  error.toString();

const SignInError = ({ error }) => {
  if (!error) return null;
  const message = getMessage(error);

  return (
    <Message danger>
      {typeof message !== 'string' ?
        <FormattedMessage {...message} values={error.params} />
      :
        error.toString()
      }
    </Message>
  );
};

export default connect(
  (state: State) => ({
    error: state.auth.error,
  }),
)(SignInError);

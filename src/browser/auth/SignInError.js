import React from 'react';
import errorMessages from '../../common/auth/errorMessages';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { firebaseMessages } from '../../common/lib/redux-firebase';

const SignInError = ({ error }) => {
  if (!error) return null;
  const message =
    errorMessages[error.name] ||
    firebaseMessages[error.name];

  return (
    <p className="signin-error">
      {message ?
        <FormattedMessage {...message} values={error.params} />
      :
        error.toString()
      }
    </p>
  );
};

SignInError.propTypes = {
  error: React.PropTypes.instanceOf(Error),
};

export default connect(state => ({
  error: state.auth.error,
}))(SignInError);

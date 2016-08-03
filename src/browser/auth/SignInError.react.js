import React, { Component, PropTypes } from 'react';
import errorMessages from '../../common/auth/errorMessages';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { firebaseMessages } from '../../common/lib/redux-firebase';

class SignInError extends Component {

  static propTypes = {
    error: PropTypes.instanceOf(Error),
  };

  render() {
    const { error } = this.props;
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
  }

}

export default connect(state => ({
  error: state.auth.error,
}))(SignInError);

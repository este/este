import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';
import { connect } from 'react-redux';
import { firebaseMessages } from '../../common/lib/redux-firebase';

const messages = defineMessages({
  required: {
    defaultMessage: `Please fill out {prop, select,
      email {email}
      password {password}
    }.`,
    id: 'auth.login.error.required'
  },
  email: {
    defaultMessage: 'Email address is not valid.',
    id: 'auth.login.error.email'
  },
  simplePassword: {
    defaultMessage: 'Password must contain at least {minLength} characters.',
    id: 'auth.login.error.simplePassword'
  }
});

class LoginError extends Component {

  static propTypes = {
    error: PropTypes.instanceOf(Error)
  };

  render() {
    const { error } = this.props;
    if (!error || error.code === 'USER_CANCELLED') return null;
    const message =
      messages[error.name] ||
      firebaseMessages[error.name];

    return (
      <p className="login-error">
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
  error: state.auth.formError
}))(LoginError);

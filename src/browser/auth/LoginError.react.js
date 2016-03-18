import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';

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
  },
  wrongPassword: {
    defaultMessage: 'Wrong password.',
    id: 'auth.login.error.wrongPassword'
  }
});

export default class LoginError extends Component {

  static propTypes = {
    error: PropTypes.object
  };

  render() {
    const { error } = this.props;

    if (!error) return null;

    return (
      <p className="error-message">
        <FormattedMessage {...messages[error.name]} values={error.params} />
      </p>
    );
  }

}

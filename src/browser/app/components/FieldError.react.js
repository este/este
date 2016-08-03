import React, { Component, PropTypes } from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';
import { ValidationError } from '../../../common/lib/validation';

const messages = defineMessages({
  required: {
    defaultMessage: `{prop, select,
      description {Please enter a description.}
      email {Please enter an email address.}
      name {Please enter a name.}
      password {Please enter a password.}
      other {You can't leave this empty.}
    }`,
    id: 'app.FieldError.required',
  },
});

export default class FieldError extends Component {

  static propTypes = {
    error: PropTypes.any,
    prop: PropTypes.string.isRequired,
  };

  render() {
    const { error, prop } = this.props;
    if (!(error instanceof ValidationError)) return null;
    if (error.params.prop !== prop) return null;

    return (
      <div className="alert alert-danger" role="alert">
        <FormattedMessage {...messages[error.name]} values={error.params} />
      </div>
    );
  }

}

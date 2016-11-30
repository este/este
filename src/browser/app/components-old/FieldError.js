/* @flow */
import React from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';
import { Message } from './';
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

type Props = {
  error: any,
  prop: string,
};

const FieldError = ({ error, prop }: Props) => {
  if (!(error instanceof ValidationError)) return null;
  if (error.params.prop !== prop) return null;
  return (
    <Message inverted theme="error">
      <FormattedMessage {...messages[error.name]} values={error.params} />
    </Message>
  );
};

export default FieldError;

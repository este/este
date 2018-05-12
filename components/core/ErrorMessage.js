// @flow
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import type { Error } from '../../server/error';
import Text, { type TextProps } from './Text';

const errorToMessage = (error: Error) => {
  switch (error.type) {
    case 'required':
      return (
        <FormattedMessage
          defaultMessage="Please fill out this field."
          id="error.required"
        />
      );
    case 'minLength':
      return (
        <FormattedMessage
          defaultMessage="{minLength} characters minimum."
          id="error.minLength"
          values={{ minLength: error.minLength }}
        />
      );
    case 'maxLength':
      return (
        <FormattedMessage
          defaultMessage="{maxLength} characters maximum."
          id="error.maxLength"
          values={{ maxLength: error.maxLength }}
        />
      );
    case 'email':
      return (
        <FormattedMessage
          defaultMessage="Email address is not valid."
          id="error.email"
        />
      );
    case 'alreadyExists':
      return (
        <FormattedMessage
          defaultMessage="Already exists."
          id="error.alreadyExists"
        />
      );
    case 'notExists':
      return (
        <FormattedMessage defaultMessage="Not exists." id="error.notExists" />
      );
    case 'wrongPassword':
      return (
        <FormattedMessage
          defaultMessage="Wrong password."
          id="error.wrongPassword"
        />
      );
    case 'notAuthorized':
      return (
        <FormattedMessage
          defaultMessage="Not authorized."
          id="error.notAuthorized"
        />
      );
    case 'unknown':
      return (
        <FormattedMessage
          defaultMessage="Unknown error: {message}"
          id="error.unknown"
          values={{ message: error.message }}
        />
      );
    case 'trim':
      return (
        <FormattedMessage
          defaultMessage="Please remove trailing whitespaces."
          id="error.trim"
        />
      );
    case 'requestFailed':
      return (
        <FormattedMessage
          defaultMessage="Network error. Please try it later."
          id="error.requestFailed"
        />
      );
    default:
      (error: empty);
      return null;
  }
};

type ErrorMessageProps = {|
  ...TextProps,
  children: ?Error,
|};

class ErrorMessage extends React.PureComponent<ErrorMessageProps> {
  render() {
    const { bold = true, color = 'danger', children, ...props } = this.props;
    if (!children) return null;
    return (
      <Text bold={bold} color={color} {...props}>
        {errorToMessage(children)}
      </Text>
    );
  }
}

export default ErrorMessage;

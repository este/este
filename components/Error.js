// @flow
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import type { Error as ErrorType } from '../server/error';
import Text, { type TextProps } from './Text';

export const errorToMessage = (error: ErrorType) => {
  switch (error.type) {
    case 'required':
      return (
        <FormattedMessage
          defaultMessage="Please fill out this field."
          id="validationError.required"
        />
      );
    case 'minLength':
      return (
        <FormattedMessage
          defaultMessage="{minLength} characters minimum."
          id="validationError.minLength"
          values={{ minLength: error.minLength }}
        />
      );
    case 'maxLength':
      return (
        <FormattedMessage
          defaultMessage="{maxLength} characters maximum."
          id="validationError.maxLength"
          values={{ maxLength: error.maxLength }}
        />
      );
    case 'email':
      return (
        <FormattedMessage
          defaultMessage="Email address is not valid."
          id="validationError.email"
        />
      );
    case 'alreadyExists':
      return (
        <FormattedMessage
          defaultMessage="Already exists."
          id="validationError.alreadyExists"
        />
      );
    case 'notExists':
      return (
        <FormattedMessage
          defaultMessage="Not exists."
          id="validationError.notExists"
        />
      );
    case 'wrongPassword':
      return (
        <FormattedMessage
          defaultMessage="Wrong password."
          id="validationError.wrongPassword"
        />
      );
    case 'notAuthorized':
      return (
        <FormattedMessage
          defaultMessage="Not authorized."
          id="validationError.notAuthorized"
        />
      );
    case 'unknownError':
      return (
        <FormattedMessage
          defaultMessage="Unknown error: {message}"
          id="validationError.unknownError"
          values={{ message: error.message }}
        />
      );
    case 'trim':
      return (
        <FormattedMessage
          defaultMessage="Please remove trailing whitespaces."
          id="validationError.trim"
        />
      );
    case 'requestFailed':
      return (
        <FormattedMessage
          defaultMessage="Network error. Please try it later."
          id="validationError.requestFailed"
        />
      );

    default:
      // eslint-disable-next-line no-unused-expressions
      (error: empty);
      return null;
  }
};

type ErrorProps = {
  ...TextProps,
  children: ?ErrorType,
};

class Error extends React.PureComponent<ErrorProps> {
  render() {
    const {
      bold = true,
      color = 'danger',
      children: error,
      ...props
    } = this.props;
    if (!error) return null;
    return (
      <Text bold={bold} color={color} {...props}>
        {errorToMessage(error)}
      </Text>
    );
  }
}

export default Error;

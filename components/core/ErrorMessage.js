// @flow
import * as React from 'react';
import Text, { type TextProps } from './Text';
import { FormattedMessage } from 'react-intl';
import type { Max140CharsError } from '../web/__generated__/CreateWebMutation.graphql';
import type {
  EmailError,
  PasswordError,
} from './__generated__/AuthMutation.graphql';

export type MessageError =
  | 'NOT_AUTHORIZED'
  | 'NET_ERROR'
  | 'UNKNOWN'
  | Max140CharsError
  | EmailError
  | PasswordError;

type ErrorMessageProps = {|
  ...TextProps,
  error: ?MessageError,
  originalErrorMessage?: string,
|};

class ErrorMessage extends React.PureComponent<ErrorMessageProps> {
  static errorToMessage(error: MessageError) {
    switch (error) {
      case 'NOT_AUTHORIZED':
        return (
          <FormattedMessage
            defaultMessage="Unauthorized."
            id="error.unauthorized"
          />
        );
      case 'NET_ERROR':
        return (
          <FormattedMessage
            defaultMessage="Network error. Please try it again."
            id="error.netError"
          />
        );
      case 'UNKNOWN':
        return (
          <FormattedMessage
            defaultMessage="An unknown error occurred. We will fix it as quickly as possible."
            id="error.unknown"
          />
        );
      case 'NO_TRAILING_SPACES':
        return (
          <FormattedMessage
            defaultMessage="Please remove trailing whitespaces."
            id="error.trim"
          />
        );
      case 'REQUIRED':
        return (
          <FormattedMessage
            defaultMessage="Please fill out this field."
            id="error.required"
          />
        );
      case 'MIN_5_CHARS':
        return (
          <FormattedMessage
            defaultMessage="{minLength} characters minimum."
            id="error.minLength"
            values={{ minLength: 5 }}
          />
        );
      case 'MAX_140_CHARS':
      case 'MAX_1024_CHARS':
        return (
          <FormattedMessage
            defaultMessage="{maxLength} characters maximum."
            id="error.maxLength"
            values={{ maxLength: error === 'MAX_140_CHARS' ? 140 : 1024 }}
          />
        );
      case 'EMAIL':
        return (
          <FormattedMessage
            defaultMessage="Email address is not valid."
            id="error.email"
          />
        );
      case 'WRONG_PASSWORD':
        return (
          <FormattedMessage
            defaultMessage="Wrong password."
            id="error.wrongPassword"
          />
        );
      case 'ALREADY_EXISTS':
        return (
          <FormattedMessage
            defaultMessage="Already exists."
            id="error.alreadyExists"
          />
        );
      case 'NOT_EXISTS':
        return (
          <FormattedMessage defaultMessage="Not exists." id="error.notExists" />
        );
      default:
        // eslint-disable-next-line no-unused-expressions
        (error: empty);
        return error;
    }
  }

  render() {
    const {
      bold = true,
      color = 'danger',
      error,
      originalErrorMessage,
      ...props
    } = this.props;
    if (!error) return null;
    const message = ErrorMessage.errorToMessage(error);
    const dev = process.env.NODE_ENV !== 'production';
    return (
      <Text bold={bold} color={color} {...props}>
        {message}
        {dev && originalErrorMessage != null && `\n${originalErrorMessage}`}
      </Text>
    );
  }
}

export default ErrorMessage;

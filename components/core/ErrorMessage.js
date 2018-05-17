// @flow
import * as React from 'react';
import Text, { type TextProps } from './Text';
import { FormattedMessage } from 'react-intl';
import type { ShortRequiredStringError } from '../__generated__/CreateWebMutation.graphql';

export type Error = ShortRequiredStringError;

//       <FormattedMessage
//         defaultMessage="{minLength} characters minimum."
//         id="error.minLength"
//         values={{ minLength: error.minLength }}
//       />
//       <FormattedMessage
//         defaultMessage="Email address is not valid."
//         id="error.email"
//       />
//       <FormattedMessage
//         defaultMessage="Already exists."
//         id="error.alreadyExists"
//       />
//       <FormattedMessage defaultMessage="Not exists." id="error.notExists" />
//       <FormattedMessage
//         defaultMessage="Wrong password."
//         id="error.wrongPassword"
//       />
//       <FormattedMessage
//         defaultMessage="Not authorized."
//         id="error.notAuthorized"
//       />
//       <FormattedMessage
//         defaultMessage="Unknown error: {message}"
//         id="error.unknown"
//         values={{ message: error.message }}
//       />
//       <FormattedMessage
//         defaultMessage="Network error. Please try it later."
//         id="error.requestFailed"
//       />

type ErrorMessageProps = {|
  ...TextProps,
  children: ?Error,
|};

class ErrorMessage extends React.PureComponent<ErrorMessageProps> {
  static errorToMessage(error: Error) {
    switch (error) {
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
      case 'MAX_140_CHARS':
        return (
          <FormattedMessage
            defaultMessage="{maxLength} characters maximum."
            id="error.maxLength"
            values={{ maxLength: 140 }}
          />
        );
      default:
        (error: empty);
        return error;
    }
  }

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
        {ErrorMessage.errorToMessage(error)}
      </Text>
    );
  }
}

export default ErrorMessage;

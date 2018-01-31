// @flow
import * as React from 'react';
import * as validation from '../backend/src/validation';
import Text, { type TextProps } from './Text';
import { FormattedMessage } from 'react-intl';

type ValidationErrorProps = {
  error: ?validation.ValidationError,
} & TextProps;

class ValidationError extends React.PureComponent<ValidationErrorProps> {
  static getValidationErrorMessage = (error: validation.ValidationError) => {
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
      case 'invalid':
        return (
          <FormattedMessage
            defaultMessage="Invalid."
            id="validationError.invalid"
          />
        );
      case 'notAuthorized':
        return (
          <FormattedMessage
            defaultMessage="Not authorized."
            id="validationError.notAuthorized"
          />
        );
      default:
        // https://flow.org/en/docs/react/redux/#toc-typing-redux-reducers
        // eslint-disable-next-line no-unused-expressions
        (error: empty);
        return null;
    }
  };

  render() {
    const { error, bold = true, color = 'danger', ...props } = this.props;
    if (!error) return null;
    const message = ValidationError.getValidationErrorMessage(error);
    return (
      <Text bold={bold} color={color} {...props}>
        {message}
      </Text>
    );
  }
}

export default ValidationError;

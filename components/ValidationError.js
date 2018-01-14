// @flow
import * as React from 'react';
import * as validation from '../graphcool/lib/validation';
import Text, { type TextProps } from './Text';
import { FormattedMessage } from 'react-intl';

type ValidationErrorProps = {
  error: ?validation.ValidationError,
} & TextProps;

class ValidationError extends React.PureComponent<ValidationErrorProps> {
  static getValidationErrorMessage = (error: validation.ValidationError) => {
    switch (error.type) {
      case 'alreadyExists':
        return (
          <FormattedMessage
            defaultMessage="Already exists."
            id="validationError.alreadyExists"
          />
        );
      case 'email':
        return (
          <FormattedMessage
            defaultMessage="Email address is not valid."
            id="validationError.email"
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
      case 'minLength':
        return (
          <FormattedMessage
            defaultMessage="{minLength} characters minimum."
            id="validationError.minLength"
            values={{ minLength: error.minLength }}
          />
        );
      case 'required':
        return (
          <FormattedMessage
            defaultMessage="Please fill out this field."
            id="validationError.required"
          />
        );
      case 'requiredAgree':
        return (
          <FormattedMessage
            defaultMessage="Please think about it."
            id="validationError.requiredAgree"
          />
        );
      case 'wrongPassword':
        return (
          <FormattedMessage
            defaultMessage="The password you have entered is invalid."
            id="validationError.wrongPassword"
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

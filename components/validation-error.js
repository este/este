// @flow
import type { ValidationError as ValidationErrorType } from '../lib/validate';
import Text, { type TextProps } from './text';
import { FormattedMessage } from 'react-intl';

type ValidationErrorProps = TextProps & {
  error: ?ValidationErrorType,
};

const getValidationErrorMessage = error => {
  switch (error.type) {
    case 'required':
      return (
        <FormattedMessage
          defaultMessage="Please fill out this field"
          id="validation.required"
        />
      );
    case 'requiredAgree':
      return (
        <FormattedMessage
          defaultMessage="Please think about it."
          id="validation.requiredAgree"
        />
      );
    case 'minLength':
      return (
        <FormattedMessage
          defaultMessage="{minLength} characters minimum"
          id="validation.minLength"
          values={{ minLength: error.minLength }}
        />
      );
    case 'maxLength':
      return (
        <FormattedMessage
          defaultMessage="{maxLength} characters maximum"
          id="validation.maxLength"
          values={{ maxLength: error.maxLength }}
        />
      );
    case 'email':
      return (
        <FormattedMessage
          defaultMessage="Email address is not valid."
          id="validation.email"
        />
      );
    default:
      // https://flow.org/en/docs/frameworks/redux/#toc-typing-redux-reducers
      // eslint-disable-next-line no-unused-expressions
      (error: empty);
      return null;
  }
};

const ValidationError = (props: ValidationErrorProps) => {
  const { error, bold = true, color = 'danger', ...restProps } = props;
  if (!error) return null;
  const message = getValidationErrorMessage(error);
  return <Text bold={bold} color={color} {...restProps}>{message}</Text>;
};

export default ValidationError;

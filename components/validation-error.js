// @flow
import type { ValidationError as ValidationErrorType } from '../lib/validate';
import Text, { type TextProps } from './text';

type ValidationErrorProps = TextProps & {
  error: ?ValidationErrorType,
};

const ValidationError = (props: ValidationErrorProps) => {
  const { error, bold = true, color = 'danger', ...restProps } = props;
  if (!error) return null;

  // TODO: Return translated message only by error.
  const msg = JSON.stringify(error);
  return <Text bold={bold} color={color} {...restProps}>{msg}</Text>;
};

export default ValidationError;

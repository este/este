// @flow
import type { ValidationErrors } from '../types';
import Text, { type TextProps } from './text';

type ValidationErrorProps = TextProps & {
  errors: ?ValidationErrors<*>,
  prop: string,
};

const ValidationError = (props: ValidationErrorProps) => {
  const { errors, prop, bold = true, color = 'danger', ...restProps } = props;
  if (!errors) return null;
  const error = errors[prop];
  if (!error) return null;

  // TODO: Return translated message only by error.
  const msg = JSON.stringify(error);
  return <Text bold={bold} color={color} {...restProps}>{msg}</Text>;
};

export default ValidationError;

// @flow
import type { AppError as AppErrorType } from '../types';
import Text, { type TextProps } from './text';

type AppErrorProps = TextProps & {
  error: ?AppErrorType,
};

const AppError = (props: AppErrorProps) => {
  const { error, bold = true, color = 'danger', ...restProps } = props;
  if (!error) return null;

  // TODO: Return translated message.
  // TODO: Report unknown error to server.
  const msg = JSON.stringify(error);
  return (
    <Text autoFocus={error} bold={bold} color={color} {...restProps}>
      {msg}
    </Text>
  );
};

export default AppError;

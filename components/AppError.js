// @flow
import type { AppError as AppErrorType } from '../types';
import Text, { type TextProps } from './Text';
import { FormattedMessage } from 'react-intl';

type AppErrorProps = TextProps & {
  error: ?AppErrorType,
};

const getAppErrorMessage = appError => {
  switch (appError.type) {
    case 'insufficientStorage':
      return (
        <FormattedMessage
          defaultMessage="Insufficient storage."
          id="appError.insufficientStorage"
        />
      );
    case 'xhrError':
      return (
        <FormattedMessage
          defaultMessage="Network error. Please try it later."
          id="appError.xhrError"
        />
      );
    case 'cannotSignInCredentialsInvalid':
      return (
        <FormattedMessage
          defaultMessage="Wrong email or password."
          id="appError.cannotSignInCredentialsInvalid"
        />
      );
    case 'unknown':
      return (
        <FormattedMessage
          defaultMessage={'{errorMessage}'}
          id="appError.unknown"
          values={{
            errorMessage: appError.message,
          }}
        />
      );
    default:
      // eslint-disable-next-line no-unused-expressions
      (appError: empty);
      return null;
  }
};

const AppError = (props: AppErrorProps) => {
  const { error, bold = true, color = 'danger', ...restProps } = props;
  if (!error) return null;

  // TODO: Report unknown error to server. Probably via errors epic catching
  // all errors like in app reducer.
  const message = getAppErrorMessage(error);
  return (
    <Text autoFocus={error} bold={bold} color={color} {...restProps}>
      {message}
    </Text>
  );
};

export default AppError;

// @flow
import React from 'react';
import type { State } from '../types';
import Text from './Text';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

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
    default:
      return appError.message;
  }
};

// There is no position fixed for React Native. Use commponent tree instead.
const browserOnlyStyle = {
  position: 'fixed',
  transform: 'translateX(-50%)',
};

const AppError = ({ errors }) => {
  if (!errors || !errors.appError) return null;
  const { appError } = errors;

  const message = getAppErrorMessage(appError);
  if (!message) return null;

  const titleWithStackForDevMode =
    process.env.NODE_ENV === 'production' ? '' : appError.stack || '';

  return (
    <Text
      backgroundColor="warning"
      bold
      color="white"
      display="inline"
      left="50%"
      margin="auto"
      paddingHorizontal={1}
      paddingVertical={0.25}
      style={browserOnlyStyle}
      title={titleWithStackForDevMode}
      top={0}
      zIndex={1}
    >
      {message}
    </Text>
  );
};

export default connect((state: State) => ({
  errors: state.app.errors,
}))(AppError);

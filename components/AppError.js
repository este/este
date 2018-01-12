// @flow
import * as React from 'react';
import Text from './Text';
import { FormattedMessage } from 'react-intl';
import AppErrorContext from './AppErrorContext';

const getAppErrorMessage = appError => {
  switch (appError.name) {
    case 'failedToFetch':
      return (
        <FormattedMessage
          defaultMessage="Network error. Please check your connection."
          id="appError.failedToFetch"
        />
      );
    case 'insufficientPermissions':
      return (
        <FormattedMessage
          defaultMessage="Insufficient permissions."
          id="appError.insufficientPermissions"
        />
      );
    case 'unknownError':
      return (
        <FormattedMessage
          defaultMessage="Unknown error. Please try it later."
          id="appError.unknownError"
        />
      );
    default:
      // https://flow.org/en/docs/react/redux/#toc-typing-redux-reducers
      // eslint-disable-next-line no-unused-expressions
      (appError: empty);
      return null;
  }
};

class AppError extends React.Component<{}> {
  render() {
    return (
      <AppErrorContext.Consumer>
        {({ appError }) => {
          if (!appError) return null;
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
              style={{ position: 'fixed', transform: 'translateX(-50%)' }}
              top={0}
              zIndex={1}
            >
              {getAppErrorMessage(appError)}
            </Text>
          );
        }}
      </AppErrorContext.Consumer>
    );
  }
}

export default AppError;

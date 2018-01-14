// @flow
import * as React from 'react';
import createReactContext, { type Context } from 'create-react-context';
import Text from './Text';
import { FormattedMessage } from 'react-intl';
import * as appError from '../lib/appError';

type Value = {|
  appError: ?appError.AppError,
  dispatchAppError: (appError: appError.AppError) => void,
|};

const value = {
  appError: null,
  dispatchAppError: () => {},
};

const AppErrorContext: Context<Value> = createReactContext(value);

export const AppErrorProvider = AppErrorContext.Provider;
export const AppErrorConsumer = AppErrorContext.Consumer;

class AppError extends React.PureComponent<{}> {
  static getAppErrorMessage = (appError: appError.AppError) => {
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
              {AppError.getAppErrorMessage(appError)}
            </Text>
          );
        }}
      </AppErrorContext.Consumer>
    );
  }
}

export default AppError;

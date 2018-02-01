// @flow
import * as React from 'react';
import createReactContext, { type Context } from 'create-react-context';
import Text from './Text';
import type { ValidationError } from '../backend/validation';
import { getValidationErrorMessage } from './ValidationError';

type Value = {|
  appError: ?ValidationError,
  dispatchAppError: (appError: ValidationError) => void,
|};

const value = {
  appError: null,
  dispatchAppError: () => {},
};

const AppErrorContext: Context<Value> = createReactContext(value);

export const AppErrorProvider = AppErrorContext.Provider;
export const AppErrorConsumer = AppErrorContext.Consumer;

// Check 'type BackendError'.
class AppError extends React.PureComponent<{}> {
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
              {getValidationErrorMessage(appError)}
            </Text>
          );
        }}
      </AppErrorContext.Consumer>
    );
  }
}

export default AppError;

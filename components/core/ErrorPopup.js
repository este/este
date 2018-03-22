// @flow
import * as React from 'react';
import createReactContext, { type Context } from 'create-react-context';
import type { Error } from '../../server/error';
import ErrorComponent from './Error';

type Value = {|
  error: ?Error,
  showError: (error: Error) => void,
|};

const value = {
  error: null,
  showError: () => {},
};

const ErrorPopupContext: Context<Value> = createReactContext(value);

export const ErrorPopupConsumer = ErrorPopupContext.Consumer;

type ErrorPopupProviderProps = {|
  children: React.Node,
|};

type ErrorPopupProviderState = {|
  error: ?Error,
|};

export class ErrorPopupProvider extends React.PureComponent<
  ErrorPopupProviderProps,
  ErrorPopupProviderState,
> {
  state = {
    error: null,
  };

  componentWillUnmount() {
    this.clearTimeout();
  }

  clearTimeout() {
    if (this.timeoutID) clearTimeout(this.timeoutID);
  }

  timeoutID: ?TimeoutID;

  showError = (error: Error) => {
    this.setState({ error });
    this.clearTimeout();
    this.timeoutID = setTimeout(() => {
      this.setState({ error: null });
    }, 5000);
  };

  render() {
    const { error } = this.state;
    const { showError } = this;
    return (
      <ErrorPopupContext.Provider value={{ error, showError }}>
        {this.props.children}
      </ErrorPopupContext.Provider>
    );
  }
}

class ErrorPopup extends React.PureComponent<{}> {
  render() {
    return (
      <ErrorPopupContext.Consumer>
        {({ error }) => {
          if (!error) return null;
          return (
            <ErrorComponent
              backgroundColor="warning"
              bold
              color="white"
              display="inline"
              left="50%"
              margin="auto"
              paddingHorizontal={1}
              paddingVertical={0.25}
              // style={{ position: 'absolute' }}
              // style={{ position: 'fixed', transform: 'translateX(-50%)' }}
              top={0}
              zIndex={1}
            >
              {error}
            </ErrorComponent>
          );
        }}
      </ErrorPopupContext.Consumer>
    );
  }
}

export default ErrorPopup;

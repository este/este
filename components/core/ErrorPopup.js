// @flow
import * as React from 'react';
import createReactContext, { type Context } from 'create-react-context';
import type { Error } from '../../server/error';
import ErrorComponent from './Error';
import Theme from './Theme';

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
    }, 10000);
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
            <Theme>
              {theme => {
                return (
                  <ErrorComponent
                    align="center"
                    color="white"
                    fixWebFontSmoothing
                    style={theme.styles.errorPopup}
                  >
                    {error}
                  </ErrorComponent>
                );
              }}
            </Theme>
          );
        }}
      </ErrorPopupContext.Consumer>
    );
  }
}

export default ErrorPopup;

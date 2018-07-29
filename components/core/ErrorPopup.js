// @flow
import * as React from 'react';
import ErrorMessage from './ErrorMessage';
import withTheme, { type Theme } from './withTheme';
import ErrorContext, { type ContextError } from './ErrorContext';

type ErrorPopupProps = {|
  error: ?ContextError,
  theme: Theme,
|};

type ErrorPopupState = {|
  shown: boolean,
|};

class ErrorPopup extends React.PureComponent<ErrorPopupProps, ErrorPopupState> {
  static runtimeErrorToMessageError(message: string) {
    switch (message) {
      case 'NOT_AUTHORIZED':
        return 'NOT_AUTHORIZED';
      case 'Failed to fetch':
        return 'NET_ERROR';
      default:
        return 'UNKNOWN';
    }
  }

  state = {
    shown: false,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.error === this.props.error) return;
    // I am pretty sure this is ok.
    // eslint-disable-next-line react/no-did-update-set-state
    this.setState({ shown: true });
    this.clearTimeout();
    this.timeoutID = setTimeout(() => {
      this.setState({ shown: false });
    }, 10000);
  }

  componentWillUnmount() {
    this.clearTimeout();
  }

  timeoutID: ?TimeoutID;

  clearTimeout() {
    if (this.timeoutID) clearTimeout(this.timeoutID);
  }

  render() {
    const { error, theme } = this.props;
    if (!error || !this.state.shown) return null;
    const messageError = ErrorPopup.runtimeErrorToMessageError(error.message);
    return (
      <ErrorMessage
        size={1}
        align="center"
        color="white"
        style={theme.styles.errorPopup}
        error={messageError}
        originalErrorMessage={error.message}
      />
    );
  }
}

const ErrorPopupWithTheme = withTheme(ErrorPopup);

// https://reactjs.org/docs/context.html#accessing-context-in-lifecycle-methods
export default () => (
  <ErrorContext.Consumer>
    {({ error }) => <ErrorPopupWithTheme error={error} />}
  </ErrorContext.Consumer>
);

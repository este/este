// @flow
import * as React from 'react';
import ErrorMessage from './ErrorMessage';
import ThemeContext, { type Theme } from './ThemeContext';
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
      case '401':
        return '401';
      case '403':
        return '403';
      case '404':
        return '404';
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
    }, 5000);
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
        fixWebFontSmoothing
        style={theme.styles.errorPopup}
        error={messageError}
      />
    );
  }
}

// https://reactjs.org/docs/context.html#accessing-context-in-lifecycle-methods
export default () => (
  <ErrorContext.Consumer>
    {({ error }) => (
      <ThemeContext.Consumer>
        {theme => <ErrorPopup error={error} theme={theme} />}
      </ThemeContext.Consumer>
    )}
  </ErrorContext.Consumer>
);

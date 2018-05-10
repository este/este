// @flow
import * as React from 'react';
import type { Error } from '../../server/error';
import ErrorMessage from './ErrorMessage';
import ThemeContext from './ThemeContext';
import ErrorContext from './ErrorContext';

// type ErrorPopupProps = {|
//   children: React.Node,
// |};
//
// type ErrorPopupState = {|
//   error: ?Error,
// |};
//
// export class ErrorPopup extends React.PureComponent<
//   ErrorPopupProps,
//   ErrorPopupState,
// > {
//   state = {
//     error: null,
//   };
//
//   componentWillUnmount() {
//     this.clearTimeout();
//   }
//
//   clearTimeout() {
//     if (this.timeoutID) clearTimeout(this.timeoutID);
//   }
//
//   timeoutID: ?TimeoutID;
//
//   showError = (error: Error) => {
//     this.setState({ error });
//     this.clearTimeout();
//     this.timeoutID = setTimeout(() => {
//       this.setState({ error: null });
//     }, 10000);
//   };
//
//   render() {
//     const { error } = this.state;
//     const { showError } = this;
//     return (
//       <ErrorPopupContext.Provider value={{ error, showError }}>
//         {this.props.children}
//       </ErrorPopupContext.Provider>
//     );
//   }
// }

class ErrorPopup extends React.PureComponent<{}> {
  render() {
    return (
      <ErrorContext.Consumer>
        {({ error }) => {
          if (!error) return null;
          return (
            <ThemeContext.Consumer>
              {theme => {
                return (
                  <ErrorMessage
                    align="center"
                    color="white"
                    fixWebFontSmoothing
                    style={theme.styles.errorPopup}
                  >
                    {error}
                  </ErrorMessage>
                );
              }}
            </ThemeContext.Consumer>
          );
        }}
      </ErrorContext.Consumer>
    );
  }
}

export default ErrorPopup;

// @flow
import * as React from 'react';
import ErrorMessage from './ErrorMessage';
import ThemeContext from './ThemeContext';
import ErrorContext from './ErrorContext';

class ErrorPopup extends React.PureComponent<{}> {
  render() {
    return (
      <ErrorContext.Consumer>
        {({ error }) => (
          <ThemeContext.Consumer>
            {theme => {
              return (
                <ErrorMessage
                  size={1}
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
        )}
      </ErrorContext.Consumer>
    );
  }
}

export default ErrorPopup;

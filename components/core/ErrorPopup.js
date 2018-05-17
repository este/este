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
              if (!error) return null;
              // window.alert(JSON.stringify(error));
              // {message: "401", locations: Array(1), path: Array(1)}
              //   locations
              //   :
              //   [{…}]
              //   message
              //   :
              //   "401"
              //   path
              //   :
              //   ["createWeb"]
              // console.log(error);
              return null;
              // return (
              //   <ErrorMessage
              //     size={1}
              //     align="center"
              //     color="white"
              //     fixWebFontSmoothing
              //     style={theme.styles.errorPopup}
              //   >
              //     {/* {error} */}
              //   </ErrorMessage>
              // );
            }}
          </ThemeContext.Consumer>
        )}
      </ErrorContext.Consumer>
    );
  }
}

export default ErrorPopup;

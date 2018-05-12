// @flow
import * as React from 'react';
import Text, { type TextProps } from './Text';
import ThemeContext from './ThemeContext';

class Heading extends React.PureComponent<TextProps> {
  render() {
    const { style, ...props } = this.props;
    return (
      <ThemeContext.Consumer>
        {theme => {
          return <Text style={[theme.styles.heading, style]} {...props} />;
        }}
      </ThemeContext.Consumer>
    );
  }
}

export default Heading;

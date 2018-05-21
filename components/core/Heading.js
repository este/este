// @flow
import * as React from 'react';
import Text, { type TextProps } from './Text';
import withTheme, { type Theme } from './withTheme';

type HeadingProps = {|
  ...TextProps,
  theme: Theme,
|};

class Heading extends React.PureComponent<HeadingProps> {
  render() {
    const { style, theme, ...props } = this.props;
    return <Text style={[theme.styles.heading, style]} {...props} />;
  }
}

export default withTheme(Heading);

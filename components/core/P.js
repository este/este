// @flow
import * as React from 'react';
import Text, { type TextProps } from './Text';
import Theme from './Theme';

class P extends React.PureComponent<TextProps> {
  render() {
    const { style, ...props } = this.props;
    return (
      <Theme>
        {theme => {
          return <Text style={[theme.styles.p.text, style]} {...props} />;
        }}
      </Theme>
    );
  }
}

export default P;

// @flow
import * as React from 'react';
import Text, { type TextProps } from './Text';
import Theme from './Theme';

class P extends React.PureComponent<TextProps> {
  render() {
    return null;
    // return (
    //   <Theme>
    //     {theme => {
    //       const {
    //         marginBottom = theme.p.marginBottom,
    //         maxWidth = theme.p.maxWidth,
    //         ...props
    //       } = this.props;
    //       return (
    //         <Text marginBottom={marginBottom} maxWidth={maxWidth} {...props} />
    //       );
    //     }}
    //   </Theme>
    // );
  }
}

export default P;

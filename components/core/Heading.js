// @flow
import * as React from 'react';
import Text, { type TextProps } from './Text';
import Theme from './Theme';

class Heading extends React.PureComponent<TextProps> {
  render() {
    return null;
    // return (
    //   <Theme>
    //     {theme => {
    //       const {
    //         bold = true,
    //         fontFamily = theme.heading.fontFamily,
    //         marginBottom = theme.heading.marginBottom,
    //         ...props
    //       } = this.props;
    //
    //       return (
    //         <Text
    //           bold={bold}
    //           fontFamily={fontFamily}
    //           marginBottom={marginBottom}
    //           {...props}
    //         />
    //       );
    //     }}
    //   </Theme>
    // );
  }
}

export default Heading;

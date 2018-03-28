// @flow
import * as React from 'react';
import Theme from './Theme';
import { View } from 'react-native';
import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

type BlockProps = {
  style?: StyleObj,
};

class Block extends React.PureComponent<BlockProps> {
  render() {
    const { style, ...props } = this.props;
    return (
      <Theme>
        {theme => {
          return <View style={[theme.styles.block.view, style]} {...props} />;
        }}
      </Theme>
    );
  }
}

export default Block;

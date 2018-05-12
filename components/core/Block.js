// @flow
import * as React from 'react';
import ThemeContext from './ThemeContext';
import { View } from 'react-native';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

type BlockProps = {|
  style?: ViewStyleProp,
  children?: React.Node,
|};

class Block extends React.PureComponent<BlockProps> {
  render() {
    const { style, ...props } = this.props;
    return (
      <ThemeContext.Consumer>
        {theme => {
          return <View style={[theme.styles.block, style]} {...props} />;
        }}
      </ThemeContext.Consumer>
    );
  }
}

export default Block;

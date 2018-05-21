// @flow
import * as React from 'react';
import withTheme, { type Theme } from './withTheme';
import { View } from 'react-native';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

type BlockProps = {|
  style?: ViewStyleProp,
  children?: React.Node,
  theme: Theme,
|};

class Block extends React.PureComponent<BlockProps> {
  render() {
    const { style, theme, ...props } = this.props;
    return <View style={[theme.styles.block, style]} {...props} />;
  }
}

export default withTheme(Block);

// @flow
import React, { type Node } from 'react';
import useTheme from './useTheme';
import { View } from 'react-native';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

type BlockProps = {|
  style?: ViewStyleProp,
  children?: Node,
|};

export default function Block({ style, ...props }: BlockProps) {
  const theme = useTheme();
  return <View style={[theme.styles.block, style]} {...props} />;
}

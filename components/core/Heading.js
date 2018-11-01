// @flow
import * as React from 'react';
import Text, { type TextProps } from './Text';
import useTheme from './useTheme';

export default function Heading({ style, ...props }: TextProps) {
  const theme = useTheme();
  return <Text style={[theme.styles.heading, style]} {...props} />;
}

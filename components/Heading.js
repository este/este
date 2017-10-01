// @flow
import * as React from 'react';
import Text, { type TextProps } from './Text';
import withTheme, { type WithTheme } from './withTheme';

type HeadingProps = TextProps;

const Heading = ({
  theme,
  bold = true,
  fontFamily = theme.heading.fontFamily,
  marginBottom = theme.heading.marginBottom,
  ...props
}) => (
  <Text
    bold={bold}
    fontFamily={fontFamily}
    marginBottom={marginBottom}
    {...props}
  />
);

const HeadingWithTheme: WithTheme<HeadingProps> = withTheme(Heading);

export default HeadingWithTheme;

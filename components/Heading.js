// @flow
import React from 'react';
import Text, { type TextProps } from './Text';
import withTheme, { type ThemeContext } from './withTheme';

const Heading = (props: TextProps, { theme }: ThemeContext) => {
  const {
    bold = true,
    fontFamily = theme.heading.fontFamily,
    marginBottom = theme.heading.marginBottom,
    ...restProps
  } = props;
  return (
    <Text
      bold={bold}
      fontFamily={fontFamily}
      marginBottom={marginBottom}
      {...restProps}
    />
  );
};

withTheme(Heading);

export default Heading;

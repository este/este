// @flow
import React from 'react';
import Text, { type TextProps } from './Text';
import withTheme, { type ThemeContext } from './withTheme';

const P = (props: TextProps, { theme }: ThemeContext) => {
  const {
    marginBottom = theme.p.marginBottom,
    maxWidth = theme.p.maxWidth,
    ...restProps
  } = props;
  return (
    <Text marginBottom={marginBottom} maxWidth={maxWidth} {...restProps} />
  );
};

withTheme(P);

export default P;

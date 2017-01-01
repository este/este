// @flow
import type { Styled } from '../themes/types';
import type { TextProps } from './Text';
import React from 'react';
import Text from './Text';

const Pre: Styled<TextProps> = ({
  border = 'left',
  borderWidth = 4,
  fontFamily = '"Roboto Mono", Menlo, Consolas, monospace',
  paddingLeft = 1,
  ...props
}) => (
  <Text
    border={border}
    borderWidth={borderWidth}
    fontFamily={fontFamily}
    paddingLeft={paddingLeft}
    {...props}
  />
);

export default Pre;

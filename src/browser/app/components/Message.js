// @flow
import type { Styled } from '../themes/types';
import type { TextProps } from './Text';
import React from 'react';
import Text from './Text';

const Message: Styled<TextProps> = ({
  bold = true,
  display = 'block',
  maxWidth = 21,
  padding = 0.5,
  ...props
}) => (
  <Text
    bold={bold}
    display={display}
    maxWidth={maxWidth}
    padding={padding}
    {...props}
  />
);

export default Message;

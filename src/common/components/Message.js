// @flow
import type { TextProps } from './Text';
import React from 'react';
import Text from './Text';

const Message = (props: TextProps) => {
  const {
    bold = true,
    color = 'white',
    padding = 0.5,
    maxWidth = 21,
    ...restProps
  } = props;
  return (
    <Text
      bold={bold}
      color={color}
      padding={padding}
      maxWidth={maxWidth}
      {...restProps}
    />
  );
};

export default Message;

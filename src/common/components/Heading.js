// @flow
import type { TextProps } from './Text';
import Text from './Text';
import React from 'react';

const Heading = ({
  bold = true,
  ...props
}: TextProps) => (
  <Text
    bold={bold}
    style={theme => ({
      fontFamily: theme.heading.fontFamily,
      marginBottom: theme.typography.rhythm(theme.heading.marginBottom),
    })}
    {...props}
  />
);

export default Heading;

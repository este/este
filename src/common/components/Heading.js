// @flow
import type { TextProps } from './Text';
import Text from './Text';
import React from 'react';

const Heading = (props: TextProps) => (
  <Text
    bold={true} // eslint-disable-line react/jsx-boolean-value
    style={theme => ({
      fontFamily: theme.heading.fontFamily,
      marginBottom: theme.typography.rhythm(theme.heading.marginBottom),
    })}
    {...props}
  />
);

export default Heading;

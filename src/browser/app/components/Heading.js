/* @flow */
import type { Styled } from '../themes/types';
import type { TextProps } from './Text';
import React from 'react';
import Text from './Text';
import styled from './styled';

// Compose Heading from Text.
const Heading = (props: TextProps) => (
  <Text
    // Override default props.
    bold={props.bold || true}
    display={props.display || 'inline'}
    lineHeight={1.25}
    {...props}
  />
);

export default Heading;

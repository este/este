/* @flow */
import React from 'react';
import { Base } from 'rebass';

type Props = {
  maxWidthInEms?: number,
  small?: boolean,
  style?: any,
};

const Form = ({ maxWidthInEms = 42, small, style, ...props }: Props) => {
  const sx = {
    ...style,
    maxWidth: `${small ? 30 : maxWidthInEms}em`,
  };
  return (
    <Base {...props} style={sx} is="form" />
  );
};

export default Form;

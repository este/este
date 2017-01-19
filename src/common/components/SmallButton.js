// @flow
import type { ButtonProps } from './Button';
import Button from './Button';
import React from 'react';

const SmallButton = ({
  // TODO: Recheck default values after Flow 0.38 Probably bug.
  marginVertical,
  paddingVertical,
  size = -1,
  ...props
}: ButtonProps) => (
  <Button
    marginVertical={marginVertical || -0.1}
    paddingVertical={paddingVertical || 0.1}
    size={size}
    {...props}
  />
);

export default SmallButton;

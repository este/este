// @flow
import type { ButtonProps } from './Button';
import Button from './Button';
import React from 'react';

const SmallButton = (props: ButtonProps) => {
  // TODO: Recheck default values in arg on Flow 0.38.
  const {
    marginVertical = -0.1,
    paddingVertical = 0.1,
    size = -1,
  } = props;
  return (
    <Button
      marginVertical={marginVertical}
      paddingVertical={paddingVertical}
      size={size}
      {...props}
    />
  );
};

export default SmallButton;

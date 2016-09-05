/* @flow */
import React from 'react';
import { Button as RebassButton } from 'rebass';

// A custom button created from the rebass button.

// medium.com/@chenglou/react-proptypes-flow-types-cheat-sheet-ed80f8e1383d
type Props = {
  disabled?: boolean,
  style?: any,
};

const Button = ({ disabled, style, ...props }: Props, { rebass }: Object) => {
  const sx = {
    ...style,
    ...(disabled && rebass.states.disabled),
  };
  return (
    <RebassButton {...props} disabled={disabled} style={sx} />
  );
};

Button.contextTypes = {
  rebass: React.PropTypes.object,
};

export default Button;

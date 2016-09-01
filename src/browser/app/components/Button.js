/* @flow weak */
import React from 'react';
import { Button as RebassButton } from 'rebass';

// Example how to create a custom button from a rebass button.
// There is a pattern, we can and should extend rebass components.
const Button = ({ children, ...props }) => (
  <RebassButton {...props}>{children}</RebassButton>
);

Button.propTypes = {
  children: React.PropTypes.node,
};

export default Button;

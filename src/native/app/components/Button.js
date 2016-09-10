/* @flow */
import React from 'react';
import theme from '../themes/initial';
import { TouchableOpacity } from 'react-native';

const Button = (props: any) => (
  <TouchableOpacity
    activeOpacity={theme.activeOpacity}
    {...props}
  />
);

export default Button;

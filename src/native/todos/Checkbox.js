// @flow
import type { ButtonProps } from '../../common/components/Button';
import React from 'react';
import { Box, Button } from '../../common/components';
import { Image } from 'react-native';

type CheckboxProps = ButtonProps & {
  checked?: boolean,
};

const images = {
  checked: require('./img/CheckboxChecked.png'),
  unchecked: require('./img/Checkbox.png'),
};

const Checkbox = (
  {
    checked,
    onPress,
    ...props
  }: CheckboxProps,
) => (
  <Button onPress={onPress} {...props}>
    <Box
      as={Image}
      source={checked ? images.checked : images.unchecked}
      style={theme => ({
        height: theme.typography.fontSize(0),
        width: theme.typography.fontSize(0),
      })}
    />
  </Button>
);

export default Checkbox;

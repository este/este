/* @flow */
import React from 'react';
import { Button } from './';
import { Image } from 'react-native';

type Props = {
  checked?: boolean,
  onPress: () => void,
  style?: Object,
};

const Checkbox = ({ checked, onPress, style }: Props) => {
  const image = checked
    ? require('./img/CheckboxChecked.png')
    : require('./img/Checkbox.png');

  return (
    <Button onPress={onPress}>
      <Image source={image} style={style} />
    </Button>
  );
};

export default Checkbox;

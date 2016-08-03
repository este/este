import React, { Component, PropTypes } from 'react';
import { Button } from './';
import { Image, View } from 'react-native';

export default class Checkbox extends Component {

  static propTypes = {
    checked: PropTypes.bool,
    onPress: PropTypes.func.isRequired,
    style: View.propTypes.style,
  };

  render() {
    const { checked, onPress, style } = this.props;
    const image = checked
      ? require('./img/CheckboxChecked.png')
      : require('./img/Checkbox.png');

    return (
      <Button onPress={onPress}>
        <Image source={image} style={style} />
      </Button>
    );
  }

}

/* @flow */
import React from 'react';
import { Button } from './';
import { Image, View } from 'react-native';

class Checkbox extends React.Component {

  static propTypes = {
    checked: React.PropTypes.bool,
    onPress: React.PropTypes.func.isRequired,
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

export default Checkbox;

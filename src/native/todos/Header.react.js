import Component from '../components/Component.react';
import React, {PropTypes, Text, View} from 'react-native';
import style from './Header.style';
import {format} from '../../common/intl/format';

export default class Header extends Component {

  static propTypes = {
    leftTodos: PropTypes.number.isRequired,
    msg: PropTypes.object.isRequired
  }

  render() {
    const {leftTodos, msg} = this.props;

    return (
      <View style={style.container}>
        <Text style={style.header}>
          {(format(msg.leftList, {size: leftTodos}))}
        </Text>
      </View>
    );
  }

}

import React, {Text, View} from 'react-native';
import {format} from '../intl/store';
import Component from '../components/component.react';

import style from './todoheader.style';

export default class TodoHeader extends Component {

  static propTypes = {
    leftTodos: React.PropTypes.number,
    msg: React.PropTypes.object.isRequired
  }

  render() {
    const {leftTodos, msg} = this.props;

    const headingMessage = leftTodos
      ? leftTodos > 1 ? msg.todos : msg.oneTodo
      : msg.emptyList;

    return (
      <View style={style.container}>
        <Text style={style.header}>
          {format(headingMessage, {size: leftTodos})}
        </Text>
      </View>
    );
  }

}

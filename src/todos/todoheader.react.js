import React, {Text, View} from 'react-native';
import {format} from '../intl/store';
import {PureComponent} from 'react-pure-render';

import style from './todoheader.style';

export default class TodoHeader extends PureComponent {

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

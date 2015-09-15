import PureComponent from '../components/component.react';
import Todo from './Todo';
import Input from '../components/input.react';
import React, {View} from 'react-native';

import {style, placeholderTextColor} from './newtodo.style';

export default class NewTodo extends PureComponent {

  static propTypes = {
    msg: React.PropTypes.object.isRequired,
    onFieldChange: React.PropTypes.func.isRequired,
    onFormSubmitted: React.PropTypes.func.isRequired,
    todo: React.PropTypes.instanceOf(Todo)
  }

  render() {
    const {todo, msg, onFormSubmitted, onFieldChange} = this.props;

    return (
      <View style={style.container}>
        <Input
          name='title'
          onChange={onFieldChange}
          onEndEditing={_ => onFormSubmitted(todo)}
          placeholder={msg.placeholder}
          placeholderTextColor={placeholderTextColor}
          style={style.input}
          value={todo.title}
        />
      </View>
    );
  }

}

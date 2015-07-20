import * as actions from './actions';
import Component from '../components/component.react';
import {msg} from '../intl/store';
import React from 'react-native';
import Input from '../components/input.react';
import Todo from './todo';
import {View} from 'react-native';

import {style, placeholderTextColor} from './newtodo.style';

export default class NewTodo extends Component {

  static propTypes = {
    todo: React.PropTypes.instanceOf(Todo)
  }

  addTodoOnEnd() {
    actions.addTodo(this.props.todo);
  }

  render() {
    const {todo} = this.props;
    return (
      <View style={style.container}>
        <Input
          name='title'
          onChange={actions.onNewTodoFieldChange}
          onEndEditing={::this.addTodoOnEnd}
          placeholder={msg('todos.newTodoPlaceholder')}
          placeholderTextColor={placeholderTextColor}
          style={style.input}
          value={todo.title}
        />
      </View>
    );
  }

}

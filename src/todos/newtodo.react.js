import * as actions from './actions';
import Component from '../components/component.react';
import {msg} from '../intl/store';
import Todo from './todo';
import React, {TextInput, View} from 'react-native';

import {style, placeholderTextColor} from './newtodo.style';

export default class NewTodo extends Component {

  constructor(...args) {
    super(...args);
    this.addTodoOnEnd = this.addTodoOnEnd.bind(this);
  }

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
        <TextInput
          name='title'
          onChange={actions.onNewTodoFieldChange}
          onEndEditing={this.addTodoOnEnd}
          placeholder={msg('todos.newTodoPlaceholder')}
          placeholderTextColor={placeholderTextColor}
          style={style.input}
          value={todo.title}
        />
      </View>
    );
  }

}

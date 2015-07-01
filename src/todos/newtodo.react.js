import * as actions from './actions';
import Component from '../components/component.react';
import {msg} from '../intl/store';
import React from 'react-native';
import Input from '../components/input.react';
import Todo from './todo';
import {
  View
} from 'react-native';

import {style, placeholderTextColor} from './newtodo.style';

class NewTodo extends Component {

  constructor(props) {
    super(props);
    this.addTodoOnEnd = this.addTodoOnEnd.bind(this);
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

NewTodo.propTypes = {
  todo: React.PropTypes.instanceOf(Todo)
};

export default NewTodo;

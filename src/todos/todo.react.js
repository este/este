import * as actions from './actions';
import Component from '../components/component.react';
import Input from '../components/input.react';
import React from 'react';
import TodoRecord from './todo';
import {
  Image,
  View
} from 'react-native';

import style from './todo.style.js';

class Todo extends Component {

  render() {
    const {todo, disabled} = this.props;

    let todoStyle = [style.input];
    if (todo.completed)
      todoStyle.push(style.inputCompleted);

    const editableFor = (propName) =>
      <Input
        editable={!disabled}
        enablesReturnKeyAutomatically={true}
        name={propName}
        onChange={e => actions.onTodoFieldChange(todo, e)}
        onEndEditing={_ => actions.onTodoEndEditing(todo)}
        style={todoStyle}
        value={todo[propName]}
      />;

    const image = todo.completed
      ? require('image!SelectedCheckbox')
      : require('image!EmptyCheckbox');

    return (
      <View style={style.container}>
        <Image
          source={image}
          style={style.checkbox}
        />
        {editableFor('title')}
      </View>
    );
  }

}

Todo.propTypes = {
  disabled: React.PropTypes.bool.isRequired,
  todo: React.PropTypes.instanceOf(TodoRecord).isRequired
};

export default Todo;

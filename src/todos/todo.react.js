import * as actions from './actions';
import Component from '../components/component.react';
import Todo from './todo';
import React, {TouchableOpacity, TextInput, Image, View} from 'react-native';

import style from './todo.style.js';

export default class TodoItem extends Component {

  static propTypes = {
    disabled: React.PropTypes.bool.isRequired,
    todo: React.PropTypes.instanceOf(Todo).isRequired
  }

  render() {
    const {todo, disabled} = this.props;

    let todoStyle = [style.input];
    if (todo.completed)
      todoStyle.push(style.inputCompleted);

    const editableFor = (propName) =>
      <TextInput
        clearButtonMode='while-editing'
        editable={!disabled}
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
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={_ => actions.toggleTodoCompleted(todo)}>
          <Image
            source={image}
            style={style.checkbox}
          />
        </TouchableOpacity>
        {editableFor('title')}
      </View>
    );
  }

}

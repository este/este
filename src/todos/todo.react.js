import React, {TouchableOpacity, Image, View} from 'react-native';
import PureComponent from '../components/component.react';
import Input from '../components/input.react';
import Todo from './Todo';

import style from './todo.style.js';

export default class TodoItem extends PureComponent {

  static propTypes = {
    disabled: React.PropTypes.bool.isRequired,
    onEndEditing: React.PropTypes.func.isRequired,
    onFieldChange: React.PropTypes.func.isRequired,
    onToggleCompleted: React.PropTypes.func.isRequired,
    todo: React.PropTypes.instanceOf(Todo).isRequired
  }

  render() {
    const {
      todo,
      disabled,
      onEndEditing,
      onFieldChange,
      onToggleCompleted
    } = this.props;

    let todoStyle = [style.input];
    if (todo.completed)
      todoStyle.push(style.inputCompleted);

    const editableFor = (propName) =>
      <Input
        clearButtonMode='while-editing'
        editable={!disabled}
        name={propName}
        onChange={e => onFieldChange(todo, e)}
        onEndEditing={_ => onEndEditing(todo)}
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
          onPress={_ => onToggleCompleted(todo)}>
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

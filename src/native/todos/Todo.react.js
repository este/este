import Component from '../components/Component.react';
import React, {Image, PropTypes, TextInput, TouchableOpacity, View} from 'react-native';
import style from './Todo.style.js';

export default class TodoItem extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    todo: PropTypes.object.isRequired
  }

  render() {
    const {actions, todo} = this.props;
    const image = todo.completed
      ? require('image!SelectedCheckbox')
      : require('image!EmptyCheckbox');

    return (
      <View style={style.container}>
        <TouchableOpacity
          activeOpacity={.8}
          onPress={() => actions.toggleTodoCompleted(todo)}
        >
          <Image source={image} style={style.checkbox} />
        </TouchableOpacity>
        <TextInput
          editable={false}
          style={[style.input]}
          value={todo.title}
        />
      </View>
    );
  }

}

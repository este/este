import Component from '../components/Component.react';
import React, {PropTypes, TextInput, View} from 'react-native';
import style, {placeholderTextColor} from './NewTodo.style';

export default class NewTodo extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    msg: PropTypes.object.isRequired,
    todo: PropTypes.object.isRequired
  }

  render() {
    const {actions, msg, todo} = this.props;

    return (
      <View style={style.container}>
        <TextInput
          onChangeText={text => actions.onNewTodoChange('title', text)}
          onEndEditing={() => actions.addTodo(todo)}
          placeholder={msg.newTodoPlaceholder}
          placeholderTextColor={placeholderTextColor}
          style={style.input}
          value={todo.title}
        />
      </View>
    );
  }

}

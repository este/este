import React, {PropTypes, Text, TouchableOpacity, View} from 'react-native';
import Component from '../components/Component.react';
import style from './Buttons.style';

export default class TodoButtons extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    hasCompletedTodos: PropTypes.bool.isRequired,
    msg: PropTypes.object.isRequired
  }

  render() {
    const {actions, hasCompletedTodos, msg} = this.props;
    // TODO: Use React 0.14 component.
    // https://github.com/facebook/react-native/issues/3369#issuecomment-147543147
    const Button = (action, text) =>
      <TouchableOpacity
        activeOpacity={.9}
        onPress={action}
        style={style.listButton}
      >
        <Text style={style.listButtonText}>{text}</Text>
      </TouchableOpacity>;

    return (
      <View style={style.buttons}>
        {hasCompletedTodos
          ? Button(actions.clearAllCompletedTodos, msg.clearCompleted)
          : Button(actions.clearAllTodos, msg.clearAll)
        }
        {
          Button(actions.addHundredTodos, msg.add100)
        }
      </View>
    );
  }

}

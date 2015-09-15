import React, {View, TouchableOpacity, Text} from 'react-native';
import PureComponent from '../components/component.react';

import style from './buttons.style';

export default class TodoButtons extends PureComponent {

  static propTypes = {
    msg: React.PropTypes.object.isRequired,
    onAddRandomTodosClicked: React.PropTypes.func,
    onClearAllClicked: React.PropTypes.func,
    onClearCompletedClicked: React.PropTypes.func
  }

  render() {
    const {
      onAddRandomTodosClicked,
      onClearAllClicked,
      onClearCompletedClicked,
      msg
    } = this.props;

    return (
      <View style={style.buttons}>

        {onClearCompletedClicked && (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={onClearCompletedClicked}
            style={style.listButton}>
            <Text style={style.listButtonText}>{msg.clearCompleted}</Text>
          </TouchableOpacity>
        )}

        {onClearAllClicked && (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={onClearAllClicked}
            style={style.listButton}>
            <Text style={style.listButtonText}>{msg.clearAll}</Text>
          </TouchableOpacity>
        )}

        {onAddRandomTodosClicked && (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={onAddRandomTodosClicked}
            style={style.listButton}>
            <Text style={style.listButtonText}>{msg.add100}</Text>
          </TouchableOpacity>
        )}

      </View>
    );
  }

}

import * as actions from '../todos/actions';
import Component from '../components/component.react';
import React from 'react-native';
import {msg} from '../intl/store';
import {View, TouchableOpacity, Text} from 'react-native';

import style from './buttons.style';

export default class TodoButtons extends Component {

  static propTypes = {
    clearAllEnabled: React.PropTypes.bool.isRequired,
    clearCompletedEnabled: React.PropTypes.bool.isRequired
  }

  render() {
    const {clearAllEnabled, clearCompletedEnabled} = this.props;
    return (
      <View style={style.buttons}>
        {clearCompletedEnabled && (
          <TouchableOpacity activeOpacity={0.9} onPress={actions.clearCompletedTodos}>
            <Text style={style.listButton}>{msg('todos.clearCompleted')}</Text>
          </TouchableOpacity>
        )}
        {!clearCompletedEnabled && clearAllEnabled && (
          <TouchableOpacity activeOpacity={0.9} onPress={actions.clearAll}>
            <Text style={style.listButton}>{msg('todos.clearAll')}</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity activeOpacity={0.9} onPress={actions.addHundredTodos}>
          <Text style={style.listButton}>{msg('todos.add100')}</Text>
        </TouchableOpacity>
      </View>
    );
  }

}

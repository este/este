import Buttons from './buttons.react';
import Component from '../components/component.react';
import React from 'react-native';
import Todo from './todo.react';
import immutable from 'immutable';
import {msg} from '../intl/store';
import {View, Text, ScrollView, Image} from 'react-native';

import style from './list.style';

export default class List extends Component {

  static propTypes = {
    pendingActions: React.PropTypes.instanceOf(immutable.Map).isRequired,
    todos: React.PropTypes.instanceOf(immutable.List)
  }

  render() {
    const {todos} = this.props;

    const hasCompletedTodos = todos.count(todo => todo.completed) > 0;

    if (todos.size === 0)
      return (
        <View style={style.centeredView}>
          <Image
            source={require('image!Empty State')}
            style={style.icon}
          />
          <Text style={style.noTodosText}>
            {msg('todos.emptyList')}
          </Text>
        </View>
      );

    return (
      <ScrollView>
        {todos.map(todo => {
          return (
            <View key={todo.id} style={style.row}>
              <Todo
                disabled={false}
                key={todo.id}
                todo={todo}
              />
            </View>
          );
        })}
        <Buttons
          clearAllEnabled={!hasCompletedTodos}
          clearCompletedEnabled={hasCompletedTodos}
        />
      </ScrollView>
    );
  }

}

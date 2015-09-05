import Buttons from './buttons.react';
import Component from '../components/component.react';
import Todo from './todo.react';
import immutable from 'immutable';
import React, {View, Text, ScrollView, Image} from 'react-native';

import style from './list.style';

export default class List extends Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    msg: React.PropTypes.object.isRequired,
    todos: React.PropTypes.instanceOf(immutable.List)
  }

  render() {
    const {
      actions,
      todos,
      msg
    } = this.props;

    const hasCompletedTodos = todos.count(todo => todo.completed) > 0;

    if (todos.size === 0)
      return (
        <View style={style.centeredView}>
          <Image
            source={require('image!Empty State')}
            style={style.icon}
          />
          <Text style={style.noTodosText}>
            {msg.empty}
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
                onEndEditing={actions.onTodoEndEditing}
                onFieldChange={actions.onTodoFieldChange}
                onToggleCompleted={actions.toggleTodoCompleted}
                todo={todo}
              />
            </View>
          );
        })}
        <Buttons
          msg={msg.buttons}
          onAddRandomTodosClicked={actions.addHundredTodos}
          onClearAllClicked={!hasCompletedTodos ? actions.clearAll : null}
          onClearCompletedClicked={hasCompletedTodos ? actions.clearCompleted : null}
        />
      </ScrollView>
    );
  }

}

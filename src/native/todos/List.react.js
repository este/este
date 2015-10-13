import Buttons from './Buttons.react';
import Component from '../components/Component.react';
import React, {Image, PropTypes, ScrollView, Text, View} from 'react-native';
import Todo from './Todo.react';
import style from './List.style';

export default class List extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    msg: PropTypes.object.isRequired,
    todos: PropTypes.object.isRequired
  }

  render() {
    const {actions, todos, msg} = this.props;
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
        {todos.map(todo =>
          <View key={todo.id} style={style.row}>
            <Todo actions={actions} todo={todo} />
          </View>
        )}
        <Buttons
          actions={actions}
          hasCompletedTodos={hasCompletedTodos}
          msg={msg}
        />
      </ScrollView>
    );
  }

}

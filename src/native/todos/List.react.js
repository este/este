import Buttons from './Buttons.react';
import Component from '../components/Component.react';
import React from 'react-native';
import Todo from './Todo.react';

const {
  Image, PropTypes, ScrollView, StyleSheet, Text, View
} = React;

const styles = StyleSheet.create({
  centeredView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 40
  },
  noTodosText: {
    color: '#aaa',
    fontSize: 20
  },
  icon: {
    height: 70,
    marginBottom: 10,
    width: 70
  },
  row: {
    borderBottomColor: '#f1f1f1',
    borderBottomWidth: 1,
    height: 63
  }
});

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
        <View style={styles.centeredView}>
          <Image
            source={require('image!Empty State')}
            style={styles.icon}
          />
          <Text style={styles.noTodosText}>
            {msg.empty}
          </Text>
        </View>
      );

    return (
      <ScrollView>
        {todos.map(todo =>
          <View key={todo.id} style={styles.row}>
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

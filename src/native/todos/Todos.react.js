import * as todosActions from '../../common/todos/actions';
import Buttons from './Buttons.react';
import Component from 'react-pure-render/component';
import React from 'react-native';
import Todo from './Todo.react';
import {connect} from 'react-redux';

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

class Todos extends Component {

  static propTypes = {
    msg: PropTypes.object.isRequired,
    todos: PropTypes.object.isRequired,
    toggleTodoCompleted: PropTypes.func.isRequired
  };

  render() {
    const {msg, todos, toggleTodoCompleted} = this.props;

    if (todos.size === 0)
      return (
        <View style={styles.centeredView}>
          <Image
            source={require('./img/EmptyState.png')}
            style={styles.icon}
          />
          <Text style={styles.noTodosText}>
            {msg.empty}
          </Text>
        </View>
      );

    const list = todos.toList().sortBy(item => item.createdAt);

    return (
      <ScrollView>
        {list.map(todo =>
          <View key={todo.id} style={styles.row}>
            <Todo todo={todo} toggleTodoCompleted={toggleTodoCompleted} />
          </View>
        )}
        <Buttons />
      </ScrollView>
    );
  }

}

export default connect(state => ({
  msg: state.intl.msg.todos,
  todos: state.todos.map
}), todosActions)(Todos);

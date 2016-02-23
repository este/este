import * as todosActions from '../../common/todos/actions';
import Component from 'react-pure-render/component';
import React from 'react-native';
import { connect } from 'react-redux';

const {
  PropTypes, StyleSheet, Text, TouchableOpacity, View
} = React;

const styles = StyleSheet.create({
  buttons: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  listButton: {
    flex: 1,
    paddingBottom: 15,
    paddingTop: 15
  },
  listButtonText: {
    color: '#C1C1C1',
    fontSize: 16,
    textAlign: 'center'
  }
});

const Button = (props) =>
  <TouchableOpacity
    activeOpacity={.9}
    onPress={props.onPress}
    style={styles.listButton}
  >
    <Text style={styles.listButtonText}>{props.children}</Text>
  </TouchableOpacity>;

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func.isRequired
};

class TodoButtons extends Component {

  static propTypes = {
    addHundredTodos: PropTypes.func.isRequired,
    clearAllCompletedTodos: PropTypes.func.isRequired,
    clearAllTodos: PropTypes.func.isRequired,
    msg: PropTypes.object.isRequired,
    todos: PropTypes.object.isRequired
  };

  render() {
    const {
      addHundredTodos, clearAllCompletedTodos, clearAllTodos, msg, todos
    } = this.props;
    const hasCompletedTodos = todos.count(todo => todo.completed) > 0;

    return (
      <View style={styles.buttons}>
        {hasCompletedTodos
          ? <Button onPress={clearAllCompletedTodos}>{msg.clearCompleted}</Button>
          : <Button onPress={clearAllTodos}>{msg.clearAll}</Button>
        }
        <Button onPress={addHundredTodos}>{msg.add100}</Button>
      </View>
    );
  }

}

export default connect(state => ({
  msg: state.intl.msg.todos,
  todos: state.todos.map
}), todosActions)(TodoButtons);

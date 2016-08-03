import React, { Component, PropTypes } from 'react';
import buttonsMessages from '../../common/todos/buttonsMessages';
import theme from '../app/theme';
import { Button, FormattedMessage } from '../app/components';
import { StyleSheet, View } from 'react-native';
import {
  addHundredTodos,
  clearAllCompletedTodos,
  clearAllTodos,
} from '../../common/todos/actions';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  button: {
    // borderWidth: 1, // To check the touchable area.
    flex: 1,
    alignItems: 'center',
    padding: theme.fontSize,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

class TodoButtons extends Component {

  static propTypes = {
    addHundredTodos: PropTypes.func.isRequired,
    clearAllCompletedTodos: PropTypes.func.isRequired,
    clearAllTodos: PropTypes.func.isRequired,
    todos: PropTypes.object.isRequired,
  };

  render() {
    const {
      addHundredTodos,
      clearAllCompletedTodos,
      clearAllTodos,
      todos,
    } = this.props;
    const hasCompletedTodos = todos.count(todo => todo.completed) > 0;

    return (
      <View style={styles.buttons}>
        {hasCompletedTodos ?
          <Button onPress={clearAllCompletedTodos} style={styles.button}>
            <FormattedMessage {...buttonsMessages.clearCompleted} />
          </Button>
        :
          <Button onPress={clearAllTodos} style={styles.button}>
            <FormattedMessage {...buttonsMessages.clearAll} />
          </Button>
        }
        <Button onPress={addHundredTodos} style={styles.button}>
          <FormattedMessage {...buttonsMessages.add100} />
        </Button>
      </View>
    );
  }

}

export default connect(state => ({
  todos: state.todos.map,
}), { addHundredTodos, clearAllCompletedTodos, clearAllTodos })(TodoButtons);

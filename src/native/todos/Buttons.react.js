import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import buttonsMessages from '../../common/todos/buttonsMessages';
import theme from '../app/theme';
import { Button, Text } from '../app/components';
import { FormattedMessage } from 'react-intl';
import { StyleSheet, View } from 'react-native';
import {
  addHundredTodos,
  clearAllCompletedTodos,
  clearAllTodos,
} from '../../common/todos/actions';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  button: {
    flex: 1,
    paddingBottom: theme.fontSizeBase,
    paddingTop: theme.fontSizeBase,
  },
  buttonText: {
    color: theme.lighten(theme.textColor),
    fontSize: theme.fontSizeBase,
    textAlign: 'center',
  },
  buttons: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
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
    const { addHundredTodos, clearAllCompletedTodos, clearAllTodos, todos } = this.props;
    const hasCompletedTodos = todos.count(todo => todo.completed) > 0;

    return (
      <View style={styles.buttons}>
        {hasCompletedTodos ?
          <Button onPress={clearAllCompletedTodos} style={styles.button}>
            <FormattedMessage {...buttonsMessages.clearCompleted}>
              {message => <Text style={styles.buttonText}>{message}</Text>}
            </FormattedMessage>
          </Button>
        :
          <Button onPress={clearAllTodos} style={styles.button}>
            <FormattedMessage {...buttonsMessages.clearAll}>
              {message => <Text style={styles.buttonText}>{message}</Text>}
            </FormattedMessage>
          </Button>
        }
        <Button onPress={addHundredTodos} style={styles.button}>
          <FormattedMessage {...buttonsMessages.add100}>
            {message => <Text style={styles.buttonText}>{message}</Text>}
          </FormattedMessage>
        </Button>
      </View>
    );
  }

}

export default connect(state => ({
  todos: state.todos.map,
}), { addHundredTodos, clearAllCompletedTodos, clearAllTodos })(TodoButtons);

import * as todosActions from '../../common/todos/actions';
import Component from 'react-pure-render/component';
import React from 'react-native';
import buttonsMessages from '../../common/todos/buttonsMessages';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

const {
  PropTypes, StyleSheet, Text, TouchableOpacity, View
} = React;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    paddingBottom: 15,
    paddingTop: 15
  },
  buttonText: {
    color: '#C1C1C1',
    fontSize: 16,
    textAlign: 'center'
  },
  buttons: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row'
  }
});

const Button = ({ message, onPress }) =>
  <TouchableOpacity activeOpacity={.9} onPress={onPress} style={styles.button}>
    <FormattedMessage {...message}>
      {message => <Text style={styles.buttonText}>{message}</Text>}
    </FormattedMessage>
  </TouchableOpacity>;

Button.propTypes = {
  message: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired
};

class TodoButtons extends Component {

  static propTypes = {
    addHundredTodos: PropTypes.func.isRequired,
    clearAllCompletedTodos: PropTypes.func.isRequired,
    clearAllTodos: PropTypes.func.isRequired,
    todos: PropTypes.object.isRequired
  };

  render() {
    const { addHundredTodos, clearAllCompletedTodos, clearAllTodos, todos } = this.props;
    const hasCompletedTodos = todos.count(todo => todo.completed) > 0;

    return (
      <View style={styles.buttons}>
        {hasCompletedTodos ?
          <Button
            message={buttonsMessages.clearCompleted}
            onPress={clearAllCompletedTodos}
          />
        :
          <Button
            message={buttonsMessages.clearAll}
            onPress={clearAllTodos}
          />
        }
        <Button message={buttonsMessages.add100} onPress={addHundredTodos} />
      </View>
    );
  }

}

export default connect(state => ({
  todos: state.todos.map
}), todosActions)(TodoButtons);

/* @flow */
import type { State } from '../../common/types';
import React from 'react';
import buttonsMessages from '../../common/todos/buttonsMessages';
import theme from '../app/themes/initial';
import { Button, FormattedMessage } from '../app/components';
import { StyleSheet, View } from 'react-native';
import { values } from 'ramda';
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

const TodoButtons = ({
  addHundredTodos,
  clearAllCompletedTodos,
  clearAllTodos,
  todos,
}) => {
  const completedTodos = values(todos).filter(todo => todo.completed).length;
  return (
    <View style={styles.buttons}>
      {completedTodos > 0 ?
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
};

TodoButtons.propTypes = {
  addHundredTodos: React.PropTypes.func.isRequired,
  clearAllCompletedTodos: React.PropTypes.func.isRequired,
  clearAllTodos: React.PropTypes.func.isRequired,
  todos: React.PropTypes.object.isRequired,
};

export default connect(
  (state: State) => ({
    todos: state.todos.all,
  }),
  { addHundredTodos, clearAllCompletedTodos, clearAllTodos },
)(TodoButtons);

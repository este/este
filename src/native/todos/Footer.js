// @flow
import type { State, Todo } from '../../common/types';
import React from 'react';
import buttonsMessages from '../../common/todos/buttonsMessages';
import { Box, Button } from '../../common/components';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { values } from 'ramda';
import {
  addHundredTodos,
  clearAllCompletedTodos,
  clearAllTodos,
} from '../../common/todos/actions';

const allTodosAreCompleted = todos => values(todos)
  .filter(todo => todo.completed)
  .length > 0;

const FooterButton = ({
  message,
  onPress,
}) => (
  <FormattedMessage {...message}>
    {msg =>
      <Button
        flex={1}
        marginVertical={0}
        onPress={onPress}
        paddingVertical={0.5}
      >{msg}</Button>
    }
  </FormattedMessage>
);

type FooterProps = {
  addHundredTodos: typeof addHundredTodos,
  clearAllCompletedTodos: typeof clearAllCompletedTodos,
  clearAllTodos: typeof clearAllTodos,
  todos: Array<Todo>,
};

const Footer = ({
  addHundredTodos,
  clearAllCompletedTodos,
  clearAllTodos,
  todos,
}: FooterProps) => (
  <Box flexDirection="row">
    {allTodosAreCompleted(todos) ?
      <FooterButton
        message={buttonsMessages.clearCompleted}
        onPress={clearAllCompletedTodos}
      />
    :
      <FooterButton
        message={buttonsMessages.clearAll}
        onPress={clearAllTodos}
      />
    }
    <FooterButton
      message={buttonsMessages.add100}
      onPress={addHundredTodos}
    />
  </Box>
);

export default connect(
  (state: State) => ({
    todos: state.todos.all,
  }),
  { addHundredTodos, clearAllCompletedTodos, clearAllTodos },
)(Footer);

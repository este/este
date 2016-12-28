/* @flow */
import type { State } from '../../common/types';
import R from 'ramda';
import React from 'react';
import buttonsMessages from '../../common/todos/buttonsMessages';
import { Box, Button } from '../app/components';
import { FormattedMessage } from 'react-intl';
import { addHundredTodos, clearAllTodos } from '../../common/todos/actions';
import { connect } from 'react-redux';

type ButtonsProps = {
  addHundredTodos: typeof addHundredTodos,
  clearAllTodos: typeof clearAllTodos,
  isEmpty: boolean,
};

const Buttons = ({
  addHundredTodos,
  clearAllTodos,
  isEmpty,
}: ButtonsProps) => (
  <Box
    display="flex"
    marginHorizontal={-0.25}
    marginVertical={1}
  >
    <FormattedMessage {...buttonsMessages.clearAll}>
      {message => (
        <Button
          primary
          disabled={isEmpty}
          marginHorizontal={0.25}
          onClick={clearAllTodos}
        >{message}</Button>
      )}
    </FormattedMessage>
    <FormattedMessage {...buttonsMessages.add100}>
      {message => (
        <Button
          primary
          marginHorizontal={0.25}
          onClick={addHundredTodos}
        >{message}</Button>
      )}
    </FormattedMessage>
  </Box>
);

export default connect(
  (state: State) => ({
    isEmpty: R.isEmpty(state.todos.all),
  }),
  { addHundredTodos, clearAllTodos },
)(Buttons);

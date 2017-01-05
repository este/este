// @flow
import type { State } from '../../common/types';
import React from 'react';
import buttonsMessages from '../../common/todos/buttonsMessages';
import { Box, Button } from '../app/components';
import { FormattedMessage } from 'react-intl';
import { addHundredTodos, clearAllTodos } from '../../common/todos/actions';
import { compose, isEmpty } from 'ramda';
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
    <Button
      primary
      disabled={isEmpty}
      marginHorizontal={0.25}
      onClick={clearAllTodos}
    >
      <FormattedMessage {...buttonsMessages.clearAll} />
    </Button>
    <Button
      primary
      marginHorizontal={0.25}
      onClick={addHundredTodos}
    >
      <FormattedMessage {...buttonsMessages.add100} />
    </Button>
  </Box>
);

export default compose(
  connect(
    (state: State) => ({
      isEmpty: isEmpty(state.todos.all),
    }),
    { addHundredTodos, clearAllTodos },
  ),
)(Buttons);

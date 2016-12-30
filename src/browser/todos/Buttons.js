// @flow
import type { State } from '../../common/types';
import React from 'react';
import buttonsMessages from '../../common/todos/buttonsMessages';
import compose from 'ramda/src/compose';
import isEmpty from 'ramda/src/isEmpty';
import { Box, Button } from '../app/components';
import { addHundredTodos, clearAllTodos } from '../../common/todos/actions';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

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

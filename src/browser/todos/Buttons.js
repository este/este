// @flow
import type { State } from '../../common/types';
import React from 'react';
import buttonsMessages from '../../common/todos/buttonsMessages';
import { Box, Button } from '../../common/components';
import { FormattedMessage } from 'react-intl';
import { addHundredTodos, clearAllTodos } from '../../common/todos/actions';
import { compose, isEmpty } from 'ramda';
import { connect } from 'react-redux';

type ButtonsProps = {
  addHundredTodos: typeof addHundredTodos,
  clearAllTodos: typeof clearAllTodos,
  isEmpty: boolean,
};

const Buttons = ({ addHundredTodos, clearAllTodos, isEmpty }: ButtonsProps) => (
  <Box flexDirection="row" marginHorizontal={-0.25} marginVertical={1}>
    <FormattedMessage {...buttonsMessages.clearAll}>
      {message => (
        <Button
          primary
          disabled={isEmpty}
          marginHorizontal={0.25}
          onPress={clearAllTodos}
        >
          {message}
        </Button>
      )}
    </FormattedMessage>
    <FormattedMessage {...buttonsMessages.add100}>
      {message => (
        <Button primary marginHorizontal={0.25} onPress={addHundredTodos}>
          {message}
        </Button>
      )}
    </FormattedMessage>
  </Box>
);

export default compose(
  connect((state: State) => ({ isEmpty: isEmpty(state.todos.all) }), {
    addHundredTodos,
    clearAllTodos,
  }),
)(Buttons);

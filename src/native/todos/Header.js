// @flow
import type { State, Todo } from '../../common/types';
import React from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';
import { connect } from 'react-redux';
import { values } from 'ramda';
import { Box, Text } from '../../common/components';

const messages = defineMessages({
  leftTodos: {
    defaultMessage: `{leftTodos, plural,
      =0 {Nothing, enjoy :-)}
      one {You have {leftTodos} task}
      other {You have {leftTodos} tasks}
    }`,
    id: 'todos.leftTodos',
  },
});

type HeaderProps = {
  todos: Array<Todo>,
};

const computeLeftTodos = todos =>
  values(todos).filter(todo => !todo.completed).length;

const Header = (
  {
    todos,
  }: HeaderProps,
) => {
  const leftTodos = computeLeftTodos(todos);
  return (
    <Box alignItems="center" backgroundColor="primary" padding={0.5}>
      <FormattedMessage {...messages.leftTodos} values={{ leftTodos }}>
        {message => <Text color="white" size={1}>{message}</Text>}
      </FormattedMessage>
    </Box>
  );
};

export default connect((state: State) => ({
  todos: state.todos.all,
}))(Header);

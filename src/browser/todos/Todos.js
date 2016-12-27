/* @flow */
import type { State } from '../../common/types';
import R from 'ramda';
import React from 'react';
import Todo from './Todo';
import todosMessages from '../../common/todos/todosMessages';
import { Box, Text } from '../app/components';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { deleteTodo, toggleTodoCompleted } from '../../common/todos/actions';

type TodosProps = {
  deleteTodo: typeof deleteTodo,
  toggleTodoCompleted: typeof toggleTodoCompleted,
  todos: Object,
};

const Todos = ({
  deleteTodo,
  todos,
  toggleTodoCompleted,
}: TodosProps) => {
  if (R.isEmpty(todos)) {
    return (
      <Box>
        <Text>
          <FormattedMessage {...todosMessages.empty} />
        </Text>
      </Box>
    );
  }

  const sortedTodos = R.compose(
    R.reverse,
    R.sortBy(R.prop('createdAt')),
    R.values, // object values to array
  )(todos);

  return (
    <Box>
      {sortedTodos.map(todo => (
        <Todo
          key={todo.id}
          deleteTodo={deleteTodo}
          todo={todo}
          toggleTodoCompleted={toggleTodoCompleted}
        />
      ))}
    </Box>
  );
};

export default connect(
  (state: State) => ({
    todos: state.todos.all,
  }),
  { deleteTodo, toggleTodoCompleted },
)(Todos);

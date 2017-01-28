// @flow
import React from 'react';
import todosMessages from '../../common/todos/todosMessages';
import type { State, Todo } from '../../common/types';
import { Box, Button, Text } from '../../common/components';
import { compose, isEmpty, prop, reverse, sortBy, values } from 'ramda';
import { connect } from 'react-redux';
import { deleteTodo, toggleTodoCompleted } from '../../common/todos/actions';
import { injectIntl } from 'react-intl';

const TodosItem = ({
  deleteTodo,
  todo,
  toggleTodoCompleted,
}) => (
  <Box flexDirection="row" marginHorizontal={-0.25}>
    <Button
      decoration={todo.completed ? 'line-through' : 'none'}
      marginHorizontal={0.25}
      onClick={() => toggleTodoCompleted(todo)}
    >{todo.title}</Button>
    <Button
      bold
      marginHorizontal={0.25}
      onClick={() => deleteTodo(todo.id)}
    >×</Button>
  </Box>
);

type TodosProps = {
  deleteTodo: typeof deleteTodo,
  intl: $IntlShape,
  todos: Object,
  toggleTodoCompleted: typeof toggleTodoCompleted,
};

const Todos = ({
  deleteTodo,
  intl,
  todos,
  toggleTodoCompleted,
}: TodosProps) => {
  if (isEmpty(todos)) {
    return (
      <Text>
        {intl.formatMessage(todosMessages.empty)}
      </Text>
    );
  }

  // It's ok and recommended to sort things in view, but for the bigger data
  // leverage reactjs/reselect or bvaughn/react-virtualized.
  const sortedTodos: Array<Todo> = compose(
    reverse,
    sortBy(prop('createdAt')),
    values,
  )(todos);

  return (
    <Box>
      {sortedTodos.map(todo => (
        <TodosItem
          key={todo.id}
          deleteTodo={deleteTodo}
          todo={todo}
          toggleTodoCompleted={toggleTodoCompleted}
        />
      ))}
    </Box>
  );
};

export default compose(
  connect(
    (state: State) => ({
      todos: state.todos.all,
    }),
    { deleteTodo, toggleTodoCompleted },
  ),
  injectIntl,
)(Todos);

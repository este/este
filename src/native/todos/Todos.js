// @flow
import type { State, Todo } from '../../common/types';
import Checkbox from './Checkbox';
import Footer from './Footer';
import React from 'react';
import todosMessages from '../../common/todos/todosMessages';
import { Box, Text, TextInput } from '../../common/components';
import { FormattedMessage } from 'react-intl';
import { Image, ScrollView, StyleSheet } from 'react-native';
import { compose, isEmpty, prop, reverse, sortBy, values } from 'ramda';
import { connect } from 'react-redux';
import { toggleTodoCompleted } from '../../common/todos/actions';

type TodoItemProps = {
  todo: Todo,
  toggleTodoCompleted: typeof toggleTodoCompleted,
};

const TodoItem = ({
  todo,
  toggleTodoCompleted,
}: TodoItemProps) => (
  <Box
    borderBottomWidth={1}
    flexDirection="row"
    flexWrap="nowrap"
    height={2}
    style={theme => ({
      borderBottomColor: theme.colors.open.gray3,
      borderBottomWidth: StyleSheet.hairlineWidth,
    })}
  >
    <Checkbox
      alignItems="center"
      checked={todo.completed}
      height={2}
      marginVertical={0}
      onPress={() => toggleTodoCompleted(todo)}
      width={2}
    />
    <TextInput
      editable={false}
      flex={1}
      height={2}
      marginHorizontal={0.5}
      value={todo.title}
    />
  </Box>
);

const IsEmpty = () => (
  <Box alignItems="center" justifyContent="center" flex={1}>
    <Image source={require('./img/EmptyState.png')} />
    <FormattedMessage {...todosMessages.empty}>
      {message =>
        <Text
          bold
          color="gray"
          marginTop={1}
          size={1}
        >{message}</Text>
      }
    </FormattedMessage>
  </Box>
);

type TodosProps = {
  todos: Array<Todo>,
  toggleTodoCompleted: typeof toggleTodoCompleted,
};

const Todos = ({
  todos,
  toggleTodoCompleted,
}: TodosProps) => {
  if (isEmpty(todos)) {
    return <IsEmpty />;
  }

  const sortedTodos = compose(
    reverse,
    sortBy(prop('createdAt')),
    values, // object values to array
  )(todos);

  return (
    <ScrollView>
      {sortedTodos.map(todo =>
        <TodoItem
          todo={todo}
          toggleTodoCompleted={toggleTodoCompleted}
          key={todo.id}
        />,
      )}
      <Footer />
    </ScrollView>
  );
};

export default connect(
  (state: State) => ({
    todos: state.todos.all,
  }),
  { toggleTodoCompleted },
)(Todos);

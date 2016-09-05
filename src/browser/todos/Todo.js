/* @flow */
import React from 'react';
import { Flex, Text } from '../app/components';

type Props = {
  deleteTodo: () => void,
  todo: Object,
  toggleTodoCompleted: () => void,
};

const Todo = ({ deleteTodo, todo, toggleTodoCompleted }: Props) => {
  const styles = {
    title: {
      ...(todo.completed && {
        textDecoration: 'line-through',
      }),
      cursor: 'pointer',
    },
    delete: {
      cursor: 'pointer',
    },
  };

  return (
    <Flex>
      <Text onClick={() => toggleTodoCompleted(todo)} style={styles.title}>
        {todo.title}
      </Text>
      <Text bold ml={1} onClick={() => deleteTodo(todo.id)} style={styles.delete}>
        ×
      </Text>
    </Flex>
  );
};

Todo.propTypes = {
  deleteTodo: React.PropTypes.func.isRequired,
  todo: React.PropTypes.object.isRequired,
  toggleTodoCompleted: React.PropTypes.func.isRequired,
};

export default Todo;

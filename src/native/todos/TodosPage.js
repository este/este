// @flow
import Header from './Header';
import NewTodo from './NewTodo';
import React from 'react';
import Todos from './Todos';
import { Box } from '../../common/components';

const TodosPage = () => (
  <Box flex={1}>
    <Header />
    <NewTodo />
    <Todos />
  </Box>
);

export default TodosPage;

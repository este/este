import Header from './Header';
import NewTodo from './NewTodo';
import React from 'react';
import Todos from './Todos';
import { Container } from '../app/components';

const TodosPage = () => (
  <Container>
    <Header />
    <NewTodo />
    <Todos />
  </Container>
);

export default TodosPage;

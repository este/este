import Header from './Header.react';
import NewTodo from './NewTodo.react';
import React from 'react';
import Todos from './Todos.react';
import { Container } from '../app/components';

class TodosPage extends React.Component {

  render() {
    return (
      <Container>
        <Header />
        <NewTodo />
        <Todos />
      </Container>
    );
  }

}

export default TodosPage;

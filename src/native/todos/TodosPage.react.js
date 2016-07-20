import Component from 'react-pure-render/component';
import Header from './Header.react';
import NewTodo from './NewTodo.react';
import React from 'react';
import Todos from './Todos.react';
import { Container } from '../app/components';

export default class TodosPage extends Component {

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

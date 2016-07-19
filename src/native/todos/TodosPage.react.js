import Component from 'react-pure-render/component';
import Header from './Header.react';
import NewTodo from './NewTodo.react';
import React from 'react';
import Todos from './Todos.react';
import styles from '../app/styles';
import { View } from 'react-native';

export default class TodosPage extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <NewTodo />
        <Todos />
      </View>
    );
  }

}

import Component from 'react-pure-render/component';
import Header from './Header.react';
import NewTodo from './NewTodo.react';
import React, { View } from 'react-native';
import Todos from './Todos.react';
import appStyles from '../app/styles';

export default class Page extends Component {

  render() {
    return (
      <View style={[appStyles.container]}>
        <Header />
        <NewTodo />
        <Todos />
      </View>
    );
  }

}

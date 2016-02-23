import Component from 'react-pure-render/component';
import Header from './Header.react';
import NewTodo from './NewTodo.react';
import React, { View } from 'react-native';
import Todos from './Todos.react';
import appStyles from '../app/styles';
import fetch from '../../common/components/fetch';
import { fetchUserTodos } from '../../common/todos/actions';

class Page extends Component {

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

// Truly universal (not only isomorphic) data fetching.
// One higher order component for browser, server, and mobile.
Page = fetch(fetchUserTodos)(Page);

export default Page;

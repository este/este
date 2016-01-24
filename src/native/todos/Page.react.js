import Component from 'react-pure-render/component';
import Header from './Header.react';
import NewTodo from './NewTodo.react';
import React, {PropTypes, View} from 'react-native';
import Todos from './Todos.react';
import appStyles from '../app/styles';
import fetch from '../../common/components/fetch';
import {fetchUserTodos} from '../../common/todos/actions';

class Page extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    msg: PropTypes.object.isRequired,
    todos: PropTypes.object.isRequired
  };

  render() {
    const {actions, msg: {todos: msg}, todos: {map, newTodo}} = this.props;

    return (
      <View style={[appStyles.container]}>
        <Header map={map} msg={msg} />
        <NewTodo actions={actions} msg={msg} todo={newTodo} />
        <Todos actions={actions} map={map} msg={msg} />
      </View>
    );
  }

}

// Truly universal (not only isomorphic) data fetching.
// One higher order component for browser, server, and mobile.
Page = fetch(fetchUserTodos)(Page);

export default Page;

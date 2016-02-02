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
    fields: PropTypes.object.isRequired,
    msg: PropTypes.object.isRequired,
    todos: PropTypes.object.isRequired
  };

  render() {
    const {actions, fields, msg: {todos: msg}, todos} = this.props;

    return (
      <View style={[appStyles.container]}>
        <Header map={todos.map} msg={msg} />
        {/* Model is passed only to enforce pure component rerender. */}
        <NewTodo actions={actions} msg={msg} model={fields.getIn(['newTodo'])} />
        <Todos actions={actions} map={todos.map} msg={msg} />
      </View>
    );
  }

}

// Truly universal (not only isomorphic) data fetching.
// One higher order component for browser, server, and mobile.
Page = fetch(fetchUserTodos)(Page);

export default Page;

import Component from '../components/Component.react';
import Header from './Header.react';
import List from './List.react';
import NewTodo from './NewTodo.react';
import React, {PropTypes, View} from 'react-native';
import appStyles from '../app/styles';
import fetch from '../../common/components/fetch';
import {fetchUserTodos} from '../../common/todos/actions';

@fetch(fetchUserTodos)
export default class Page extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    msg: PropTypes.object.isRequired,
    todos: PropTypes.object.isRequired
  }

  render() {
    const {actions, msg: {todos: msg}, todos} = this.props;
    const leftTodos = todos.list.filter(todo => !todo.completed).size;

    return (
      <View style={[appStyles.container]}>
        <Header leftTodos={leftTodos} msg={msg} />
        <NewTodo actions={actions} msg={msg} todo={todos.newTodo} />
        <List actions={actions} msg={msg} todos={todos.list} />
      </View>
    );
  }

}

import React, {View} from 'react-native';
import {PureComponent} from 'react-pure-render';
import List from '../todos/list.react';
import NewTodo from '../todos/newtodo.react';
import TodoHeader from '../todos/todoheader.react';
import Header from '../components/header.react';
import {container} from '../app/app.style';

export default class Todos extends PureComponent {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    msg: React.PropTypes.object.isRequired,
    todos: React.PropTypes.object.isRequired
  }

  render() {
    const {
      todos,
      actions,
      msg: {todos: msg}
    } = this.props;

    const leftTodos = todos.get('list').filter(todo => !todo.completed).size;

    return (
      <View style={container}>

        <Header
          menuButtonAction={actions.app.toggleMenu}
          title={msg.title}
        />

        <TodoHeader
          leftTodos={leftTodos}
          msg={msg.leftTodos}
        />

        <NewTodo
          msg={msg.newTodo}
          onFieldChange={actions.todos.onNewTodoFieldChange}
          onFormSubmitted={actions.todos.addTodo}
          todo={todos.newTodo}
        />

        <List
          actions={actions.todos}
          editables={todos.editables}
          msg={msg.list}
          todos={todos.list}
        />

      </View>
    );
  }

}

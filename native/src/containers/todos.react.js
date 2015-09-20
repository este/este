import React, {View} from 'react-native';
import {bindActionCreators} from 'redux';
import PureComponent from '../components/component.react';

// Styles
import {container} from '../app/app.style';

// Actions
import {toggleMenu} from '../app/actions';
import * as TodoActionCreators from '../todos/actions';

// Components
import List from '../todos/list.react';
import NewTodo from '../todos/newtodo.react';
import TodoHeader from '../todos/todoheader.react';
import Header from '../components/header.react';

export default class TodoView extends PureComponent {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    msg: React.PropTypes.object.isRequired,
    todos: React.PropTypes.object.isRequired
  }

  render() {
    const {
      dispatch,
      todos,
      msg: {todos: msg}
    } = this.props;

    const todoActions = bindActionCreators(TodoActionCreators, dispatch);

    return (
      <View style={container}>

        <Header
          menuButtonAction={_ => dispatch(toggleMenu())}
          title={msg.title}
        />

        <TodoHeader
          leftTodos={todos.list.size}
          msg={msg.leftTodos}
        />

        <NewTodo
          msg={msg.newTodo}
          onFieldChange={todoActions.onNewTodoFieldChange}
          onFormSubmitted={todoActions.addTodo}
          todo={todos.newTodo}
        />

        <List
          actions={todoActions}
          msg={msg.list}
          todos={todos.list}
        />

      </View>
    );
  }

}

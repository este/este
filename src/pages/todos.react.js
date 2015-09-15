import React, {View} from 'react-native';
import connect from '../lib/connect';
import {bindActionCreators} from 'redux';
import PureComponent from '../components/component.react';

// Styles
import {container} from '../app/app.style';

// Selectors
import {selectTranslations} from '../intl/selectors';
import {selectVisibleTodos, selectNewTodo, selectLeftTodos} from '../todos/selectors';

// Actions
import {toggleMenu} from '../app/actions';
import * as TodoActionCreators from '../todos/actions';

// Components
import List from '../todos/list.react';
import NewTodo from '../todos/newtodo.react';
import TodoHeader from '../todos/todoheader.react';
import Header from '../components/header.react';

@connect(selectTranslations, selectVisibleTodos, selectNewTodo, selectLeftTodos)
export default class Todos extends PureComponent {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    hasCompletedTodos: React.PropTypes.bool,
    leftTodos: React.PropTypes.object.isRequired,
    msg: React.PropTypes.object.isRequired,
    newTodo: React.PropTypes.object.isRequired,
    visibleTodos: React.PropTypes.object.isRequired
  }

  render() {
    const {
      dispatch,
      newTodo,
      visibleTodos,
      hasCompletedTodos,
      leftTodos,
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
          leftTodos={leftTodos.size}
          msg={msg.leftTodos}
        />

        <NewTodo
          msg={msg.newTodo}
          onFieldChange={todoActions.onNewTodoFieldChange}
          onFormSubmitted={todoActions.addTodo}
          todo={newTodo}
        />

        <List
          actions={todoActions}
          hasCompletedTodos={hasCompletedTodos}
          msg={msg.list}
          todos={visibleTodos}
        />

      </View>
    );
  }

}

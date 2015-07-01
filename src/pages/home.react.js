import Component from '../components/component.react';
import immutable from 'immutable';
import List from '../todos/list.react';
import NewTodo from '../todos/newtodo.react';
import React from 'react-native';
import TodoHeader from '../todos/todoheader.react';
import {
  View
} from 'react-native';

import style from './home.style';

class Home extends Component {

  render() {
    const {todos, pendingActions} = this.props;
    const leftTodos = todos.get('list').filter(todo => !todo.completed).size;

    return (
      <View style={style.container}>
        <TodoHeader leftTodos={leftTodos} />
        <NewTodo todo={todos.get('newTodo')} />
        <List
          editables={todos.get('editables')}
          pendingActions={pendingActions}
          todos={todos.get('list')}
        />
      </View>
    );
  }

}

Home.propTypes = {
  pendingActions: React.PropTypes.instanceOf(immutable.Map).isRequired,
  todos: React.PropTypes.instanceOf(immutable.Map).isRequired
};

export default Home;

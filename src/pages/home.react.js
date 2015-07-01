import Component from '../components/component.react';
import immutable from 'immutable';
import NewTodo from '../todos/newtodo.react';
import React from 'react-native';
import TodoHeader from '../todos/todoheader.react';
import {
  View,
  Text
} from 'react-native';
import {msg} from '../intl/store';

import style from './home.style';

class Home extends Component {

  render() {
    const {todos} = this.props;
    const leftTodos = todos.get('list').size;

    return (
      <View style={style.container}>
        <TodoHeader leftTodos={leftTodos} />
        <NewTodo todo={todos.get('newTodo')} />
        <View style={style.centeredView}>
          <Text>{msg('home.text')}</Text>
        </View>
      </View>
    );
  }

}

Home.propTypes = {
  navigation: React.PropTypes.object,
  todos: React.PropTypes.instanceOf(immutable.Map).isRequired
};

export default Home;

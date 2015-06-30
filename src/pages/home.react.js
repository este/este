import Component from '../components/component.react';
import immutable from 'immutable';
import React from 'react-native';
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

        <View style={style.header}>
          <Text style={style.headerText}>
            {!leftTodos && msg('todos.emptyListHeading')}
            {leftTodos == 1 && msg('todos.oneTodo')}
            {leftTodos > 1 && msg('todos.todos', {size: leftTodos})}
          </Text>
        </View>

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

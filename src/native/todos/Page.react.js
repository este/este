import Component from '../components/Component.react';
import Header from './Header.react';
import List from './List.react';
import NewTodo from './NewTodo.react';
import React, {PropTypes, View} from 'react-native';
import style from '../app/App.style';

export default class Page extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    msg: PropTypes.object.isRequired,
    todos: PropTypes.object.isRequired
  }

  render() {
    const {actions, msg: {todos: msg}, todos} = this.props;

    return (
      <View style={[style.container]}>
        <Header leftTodos={0} msg={msg} />
        <NewTodo actions={actions} msg={msg} todo={todos.newTodo} />
        <List actions={actions} msg={msg} todos={todos.list} />
      </View>
    );
  }

}

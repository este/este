import Component from '../components/Component.react';
import Header from './Header.react';
import List from './List.react';
import NewTodo from './NewTodo.react';
import React, {PropTypes, View} from 'react-native';
import appStyles from '../app/styles';
import fetch from '../components/fetch';
import {fetchUserTodos} from '../../common/todos/actions';

@fetch(fetchUserTodos)
export default class Page extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    msg: PropTypes.object.isRequired,
    todos: PropTypes.object.isRequired
  }

  render() {
    const {actions, msg: {todos: msg}, todos: {map, newTodo}} = this.props;

    return (
      <View style={[appStyles.container]}>
        <Header map={map} msg={msg} />
        <NewTodo actions={actions} msg={msg} todo={newTodo} />
        <List actions={actions} map={map} msg={msg} />
      </View>
    );
  }

}

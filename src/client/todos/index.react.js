import Buttons from './buttons.react';
import Component from '../components/component.react';
import DocumentTitle from 'react-document-title';
import NewTodo from './newtodo.react';
import React from 'react';
import ToCheck from './tocheck.react';
import Todos from './todos.react';
import * as api from '../lib/api';

export default class Index extends Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    msg: React.PropTypes.object.isRequired,
    todos: React.PropTypes.object.isRequired
  }

  // appState is javascript object.
  // return false to prevent state merging.
  static fetchData(forceUpdate, params, query, appState) {
    // const list = appState.todos && appState.todos.list;
    // if (!forceUpdate && list && !list.every(item => '' + item.id !== '' + params.id)) return false;

    const {users: {viewer}} = appState;
    return api.post('/api/v1/todos', viewer).then(res => {
      return {
        todos: {
          list: res.data
        }
      };
    });
  }

  render() {
    const {
      todos: {newTodo, list},
      actions: {todos: actions},
      msg: {todos: msg}
    } = this.props;

    return (
      <DocumentTitle title={msg.title}>
        <div className="todos-page">
          <NewTodo {...{newTodo, actions, msg}} />
          {/* It's just shorter syntax for:
            <NewTodo actions={actions} msg={msg} newTodo={newTodo} />
          */}
          <Todos {...{list, actions, msg}} />
          <Buttons clearAllEnabled={list.size > 0} {...{actions, msg}} />
          <ToCheck msg={msg.toCheck} />
        </div>
      </DocumentTitle>
    );
  }

}

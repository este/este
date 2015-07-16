import Buttons from '../todos/buttons.react';
import Component from '../components/component.react';
import DocumentTitle from 'react-document-title';
import List from '../todos/list.react';
import NewTodo from '../todos/newtodo.react';
import React from 'react';
import ToCheck from './tocheck.react';
import immutable from 'immutable';
import {msg} from '../intl/store';

export default class Todos extends Component {

  static propTypes = {
    pendingActions: React.PropTypes.instanceOf(immutable.Map).isRequired,
    todos: React.PropTypes.instanceOf(immutable.Map).isRequired
  };

  render() {
    const {todos, pendingActions} = this.props;
    const list = todos.get('list');

    return (
      <DocumentTitle title={msg('pages.todos.title')}>
        <div className="todos-page">
          <NewTodo todo={todos.get('newTodo')} />
          <List
            editables={todos.get('editables')}
            pendingActions={pendingActions}
            todos={list}
          />
          <Buttons clearAllEnabled={list.size > 0} />
          <ToCheck />
        </div>
      </DocumentTitle>
    );
  }

}

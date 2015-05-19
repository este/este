import Buttons from '../todos/buttons.react';
import DocumentTitle from 'react-document-title';
import immutable from 'immutable';
import List from '../todos/list.react';
import {msg} from '../intl/store';
import NewTodo from '../todos/newtodo.react';
import PureComponent from '../components/purecomponent.react';
import React from 'react';
import ToCheck from './tocheck.react';

class Todos extends PureComponent {

  render() {
    const editables = this.props.todos.get('editables');
    const newTodo = this.props.todos.get('newTodo');
    const todos = this.props.todos.get('list');

    return (
      <DocumentTitle title={msg('todos.title')}>
        <section className="todos-page">
          <NewTodo todo={newTodo} />
          <List
            editables={editables}
            pendingActions={this.props.pendingActions}
            todos={todos}
          />
          <Buttons clearAllEnabled={todos.size > 0} />
          <ToCheck />
        </section>
      </DocumentTitle>
    );
  }

}

Todos.propTypes = {
  app: React.PropTypes.instanceOf(immutable.Map).isRequired,
  pendingActions: React.PropTypes.instanceOf(immutable.Map).isRequired,
  todos: React.PropTypes.instanceOf(immutable.Map).isRequired
};

export default Todos;

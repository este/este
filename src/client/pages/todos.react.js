import Buttons from '../todos/buttons.react';
import Component from '../components/component.react';
import DocumentTitle from 'react-document-title';
import List from '../todos/list.react';
import NewTodo from '../todos/newtodo.react';
import React from 'react';
import ToCheck from './tocheck.react';
import immutable from 'immutable';
import {msg} from '../intl/store';

// Leverage webpack require goodness.
require('./todos.styl');

class Todos extends Component {

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

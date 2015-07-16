import * as actions from './actions';
import Component from '../components/component.react';
import React from 'react';
import Todo from './todo.react';
import immutable from 'immutable';
import {msg} from '../intl/store';

export default class List extends Component {

  static propTypes = {
    editables: React.PropTypes.instanceOf(immutable.Map).isRequired,
    pendingActions: React.PropTypes.instanceOf(immutable.Map).isRequired,
    todos: React.PropTypes.instanceOf(immutable.List)
  };

  render() {
    const {todos, editables, pendingActions} = this.props;

    if (!todos.size)
      return (
        <p>{msg('todos.emptyList')}</p>
      );

    return (
      <ol className="todo-list">
        {todos.map(todo => {
          const editable = editables.get(todo.id);
          const disabled =
            !!editable &&
            pendingActions.has(actions.onEditableSave.toString());

          return (
            <Todo
              disabled={disabled}
              editable={editable}
              key={todo.id}
              todo={todo}
            />
          );
        })}
      </ol>
    );
  }

}

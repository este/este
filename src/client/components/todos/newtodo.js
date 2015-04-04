import PureComponent from '../../../lib/purecomponent';
import React from 'react';
import immutable from 'immutable';
import {addTodo, onNewTodoFieldChange} from '../../todos/actions';
import {addons} from 'react/addons';
import {msg} from '../../intl/store';

export default class NewTodo extends PureComponent {
  static propTypes = {
    todo: React.PropTypes.instanceOf(immutable.Map)
  };

  addTodoOnEnter(e) {
    if (e.key === 'Enter')
      addTodo(this.props.todo);
  }

  render() {
    return (
      <input
        autoFocus
        className="new-todo"
        name="title"
        onChange={onNewTodoFieldChange}
        onKeyDown={(e) => this.addTodoOnEnter(e)}
        placeholder={msg('todos.newTodoPlaceholder')}
        value={this.props.todo.get('title')}
      />
    );
  }

}

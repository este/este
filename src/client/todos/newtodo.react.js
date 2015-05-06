import PureComponent from '../components/purecomponent.react';
import React from 'react';
import immutable from 'immutable';
import {addTodo, onNewTodoFieldChange} from './actions';
import {msg} from '../intl/store';

export default class NewTodo extends PureComponent {

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
        value={this.props.todo.title}
      />
    );
  }

}

NewTodo.propTypes = {
  todo: React.PropTypes.instanceOf(immutable.Record)
};

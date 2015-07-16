import './newtodo.styl';
import * as actions from './actions';
import Component from '../components/component.react';
import React from 'react';
import immutable from 'immutable';
import {msg} from '../intl/store';

export default class NewTodo extends Component {

  static propTypes = {
    todo: React.PropTypes.instanceOf(immutable.Record)
  };

  addTodoOnEnter(e) {
    if (e.key === 'Enter')
      actions.addTodo(this.props.todo);
  }

  render() {
    return (
      <input
        autoFocus
        className="new-todo"
        name="title"
        onChange={actions.onNewTodoFieldChange}
        onKeyDown={(e) => this.addTodoOnEnter(e)}
        placeholder={msg('todos.newTodoPlaceholder')}
        value={this.props.todo.title}
      />
    );
  }

}

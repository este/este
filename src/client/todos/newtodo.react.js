import './newtodo.styl';
import Component from '../components/component.react';
import React from 'react';

export default class NewTodo extends Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    msg: React.PropTypes.object.isRequired,
    newTodo: React.PropTypes.object.isRequired
  }

  onKeyDown(e) {
    if (e.key === 'Enter')
      this.props.actions.addTodo(this.props.newTodo);
  }

  render() {
    const {actions, msg, newTodo} = this.props;

    return (
      <input
        autoFocus
        className="new-todo"
        name="title"
        onChange={actions.setNewTodoField}
        onKeyDown={::this.onKeyDown}
        placeholder={msg.newTodoPlaceholder}
        value={newTodo.title}
      />
    );
  }

}

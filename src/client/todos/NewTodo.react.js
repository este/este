import './NewTodo.styl';
import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';

export default class NewTodo extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    msg: PropTypes.object.isRequired,
    newTodo: PropTypes.object.isRequired
  }

  onKeyDown(e) {
    const {actions, newTodo} = this.props;
    if (e.key === 'Enter' && newTodo.title.trim())
      actions.addTodo(newTodo);
  }

  render() {
    const {actions, msg, newTodo} = this.props;

    return (
      <input
        autoFocus
        className="new-todo"
        name="title"
        onChange={e => actions.onNewTodoChange(e.target.name, e.target.value)}
        onKeyDown={e => this.onKeyDown(e)}
        placeholder={msg.newTodoPlaceholder}
        value={newTodo.title}
      />
    );
  }

}

import './NewTodo.scss';
import * as todosActions from '../../common/todos/actions';
import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {fields} from '../../common/lib/redux-fields';

class NewTodo extends Component {

  static propTypes = {
    addTodo: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    msg: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.onInputKeyDown = this.onInputKeyDown.bind(this);
  }

  onInputKeyDown(e) {
    if (e.key !== 'Enter') return;
    const {addTodo, fields} = this.props;
    if (!fields.title.value.trim()) return;
    addTodo(fields.title.value);
    fields.$reset();
  }

  render() {
    const {fields, msg} = this.props;

    return (
      <input
        autoFocus
        className="new-todo"
        maxLength={100}
        onKeyDown={this.onInputKeyDown}
        placeholder={msg.newTodoPlaceholder}
        {...fields.title}
      />
    );
  }

}

NewTodo = fields(NewTodo, {
  path: 'newTodo',
  fields: ['title']
});

export default connect(state => ({
  msg: state.intl.msg.todos
}), todosActions)(NewTodo);

import './NewTodo.scss';
import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import fields from '../../common/components/fields';

class NewTodo extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    fields: PropTypes.object.isRequired,
    msg: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.onInputKeyDown = this.onInputKeyDown.bind(this);
  }

  onInputKeyDown(e) {
    if (e.key !== 'Enter') return;
    const {actions, fields} = this.props;
    if (!fields.title.value.trim()) return;
    actions.addTodo(fields.title.value);
    fields.$reset();
  }

  render() {
    const {fields, msg} = this.props;
    const {title} = fields;

    return (
      <input
        autoFocus
        className="new-todo"
        maxLength={100}
        onKeyDown={this.onInputKeyDown}
        placeholder={msg.newTodoPlaceholder}
        {...title}
      />
    );
  }

}

NewTodo = fields(NewTodo, {
  path: 'newTodo',
  fields: ['title']
});

export default NewTodo;

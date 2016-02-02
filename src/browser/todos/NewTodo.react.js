import './NewTodo.styl';
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
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputKeyDown = this.onInputKeyDown.bind(this);
  }

  onInputChange(e) {
    const {actions} = this.props;
    actions.onNewTodoChange(e.target.name, e.target.value);
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

import './NewTodo.scss';
import * as todosActions from '../../common/todos/actions';
import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import newTodoMessages from '../../common/todos/newTodoMessages';
import { connect } from 'react-redux';
import { fields } from '../../common/lib/redux-fields';
import { injectIntl, intlShape } from 'react-intl';

class NewTodo extends Component {

  static propTypes = {
    addTodo: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    intl: intlShape.isRequired
  };

  constructor(props) {
    super(props);
    this.onInputKeyDown = this.onInputKeyDown.bind(this);
  }

  onInputKeyDown(e) {
    if (e.key !== 'Enter') return;
    const { addTodo, fields } = this.props;
    if (!fields.title.value.trim()) return;
    addTodo(fields.title.value);
    fields.$reset();
  }

  render() {
    const { intl, fields } = this.props;
    const placeholder = intl.formatMessage(newTodoMessages.placeholder);

    return (
      <input
        autoFocus
        className="new-todo"
        maxLength={100}
        onKeyDown={this.onInputKeyDown}
        placeholder={placeholder}
        {...fields.title}
      />
    );
  }

}

NewTodo = fields(NewTodo, {
  path: 'newTodo',
  fields: ['title']
});

NewTodo = injectIntl(NewTodo);

export default connect(null, todosActions)(NewTodo);

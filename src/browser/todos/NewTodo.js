import './NewTodo.scss';
import React from 'react';
import newTodoMessages from '../../common/todos/newTodoMessages';
import { FormattedMessage } from 'react-intl';
import { addTodo } from '../../common/todos/actions';
import { connect } from 'react-redux';
import { fields } from '../../common/lib/redux-fields';

let NewTodo = ({ addTodo, fields }) => {
  const onInputKeyDown = event => {
    if (event.key !== 'Enter') return;
    if (!fields.title.value.trim()) return;
    addTodo(fields.title.value);
    fields.$reset();
  };

  return (
    <FormattedMessage {...newTodoMessages.placeholder}>
      {message =>
        <input
          {...fields.title}
          autoFocus
          className="new-todo"
          maxLength={100}
          onKeyDown={onInputKeyDown}
          placeholder={message}
        />
      }
    </FormattedMessage>
  );
};

NewTodo.propTypes = {
  addTodo: React.PropTypes.func.isRequired,
  fields: React.PropTypes.object.isRequired,
};

NewTodo = fields(NewTodo, {
  path: 'newTodo',
  fields: ['title'],
});

export default connect(null, { addTodo })(NewTodo);

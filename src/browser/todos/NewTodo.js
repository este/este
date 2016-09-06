/* @flow */
import React from 'react';
import newTodoMessages from '../../common/todos/newTodoMessages';
import { Input, Form } from '../app/components';
import { addTodo } from '../../common/todos/actions';
import { connect } from 'react-redux';
import { fields } from '../../common/lib/redux-fields';
import { injectIntl, intlShape } from 'react-intl';

let NewTodo = ({ addTodo, fields, intl }) => {
  const onInputKeyDown = event => {
    if (event.key !== 'Enter') return;
    if (!fields.title.value.trim()) return;
    addTodo(fields.title.value);
    fields.$reset();
  };

  return (
    <Form small>
      <Input
        {...fields.title}
        label=""
        maxLength={100}
        onKeyDown={onInputKeyDown}
        placeholder={intl.formatMessage(newTodoMessages.placeholder)}
      />
    </Form>
  );
};

NewTodo.propTypes = {
  addTodo: React.PropTypes.func.isRequired,
  fields: React.PropTypes.object.isRequired,
  intl: intlShape.isRequired,
};

NewTodo = fields(NewTodo, {
  path: 'newTodo',
  fields: ['title'],
});

NewTodo = injectIntl(NewTodo);

export default connect(null, { addTodo })(NewTodo);

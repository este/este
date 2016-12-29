// @flow
import React from 'react';
import compose from 'ramda/src/compose';
import newTodoMessages from '../../common/todos/newTodoMessages';
import { Form, Input } from '../app/components';
import { addTodo } from '../../common/todos/actions';
import { connect } from 'react-redux';
import { fields } from '../../common/lib/redux-fields';
import { injectIntl } from 'react-intl';

type NewTodoProps = {|
  addTodo: typeof addTodo,
  fields: any,
  intl: any,
|};

const NewTodo = ({ addTodo, fields, intl }: NewTodoProps) => (
  <Form
    onSubmit={() => {
      const title = fields.title.value.trim();
      if (!title) return;
      addTodo(title);
      fields.$reset();
    }}
  >
    <Input
      {...fields.title}
      maxLength={100}
      placeholder={intl.formatMessage(newTodoMessages.placeholder)}
      size={1}
    />
  </Form>
);

export default compose(
  connect(
    null,
    { addTodo },
  ),
  injectIntl,
  fields({
    path: 'newTodo',
    fields: ['title'],
  }),
)(NewTodo);

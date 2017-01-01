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
  intl: $IntlShape,
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
      field={fields.title}
      maxLength={100}
      label={intl.formatMessage(newTodoMessages.placeholder)}
      placeholder="..."
      size={2}
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

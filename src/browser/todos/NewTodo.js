// @flow
import React from 'react';
import newTodoMessages from '../../common/todos/newTodoMessages';
import { Form } from '../components';
import { Text, TextInput } from '../../common/components';
import { addTodo } from '../../common/todos/actions';
import { compose } from 'ramda';
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
    <Text bold size={1}>
      {intl.formatMessage(newTodoMessages.placeholder)}
    </Text>
    <TextInput
      {...fields.title}
      maxLength={100}
      placeholder="..."
      size={2}
      type="text"
    />
  </Form>
);

export default compose(
  connect(null, { addTodo }),
  injectIntl,
  fields({ path: 'newTodo', fields: ['title'] }),
)(NewTodo);

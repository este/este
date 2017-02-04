// @flow
import React from 'react';
import newTodoMessages from '../../common/todos/newTodoMessages';
import { Box, TextInput } from '../../common/components';
import { addTodo } from '../../common/todos/actions';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { fields } from '../../common/lib/redux-fields';
import { injectIntl } from 'react-intl';

type NewTodoProps = {
  addTodo: typeof addTodo,
  fields: React.PropTypes.object.isRequired,
  intl: $IntlShape,
};

const onSubmitEditing = (fields, addTodo) => () => {
  if (!fields.title.value.trim()) return;
  addTodo(fields.title.value);
  fields.$reset();
};

const NewTodo = (
  {
    addTodo,
    fields,
    intl,
  }: NewTodoProps,
) => (
  <Box backgroundColor="primary" paddingVertical={0.5}>
    <TextInput
      {...fields.title}
      color="white"
      marginHorizontal={1}
      maxLength={100}
      onSubmitEditing={onSubmitEditing(fields, addTodo)}
      placeholder={intl.formatMessage(newTodoMessages.placeholder)}
      size={1}
    />
  </Box>
);

export default compose(
  connect(null, { addTodo }),
  fields({
    path: 'newTodo',
    fields: ['title'],
  }),
  injectIntl,
)(NewTodo);

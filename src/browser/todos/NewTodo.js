/* @flow */
import R from 'ramda';
import React from 'react';
import newTodoMessages from '../../common/todos/newTodoMessages';
import { addTodo } from '../../common/todos/actions';
import { connect } from 'react-redux';
import { fields } from '../../common/lib/redux-fields';
import { injectIntl } from 'react-intl';
import {
  Input,
  Form,
  Text,
} from '../app/components';

type NewTodoProps = {|
  addTodo: typeof addTodo,
  fields: any,
  intl: any,
|};

const NewTodo = ({ addTodo, fields, intl }: NewTodoProps) => (
  <Form onSubmit={e => {
    // addTodo(1)
  }}>
    <Input
      // label="Input"
      // labelSize={1}
      // placeholder="Lorem ipsum dolor"
    />
    {/* Fok
    {addTodo('d')} */}
    {/* <Input
      {...fields.title}
      // label=""
      // maxLength={100}
      // onKeyDown={onInputKeyDown}
      // placeholder={intl.formatMessage(newTodoMessages.placeholder)}
    /> */}
  </Form>
);

export default R.compose(
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


// const NewTodo = ({ addTodo, fields, intl }) => {
//   const onInputKeyDown = (event) => {
//     if (event.key !== 'Enter') return;
//     if (!fields.title.value.trim()) return;
//     addTodo(fields.title.value);
//     fields.$reset();
//   };

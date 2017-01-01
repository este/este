// @flow
import Buttons from './Buttons';
import NewTodo from './NewTodo';
import React from 'react';
import Todos from './Todos';
import linksMessages from '../../common/app/linksMessages';
import { Box, PageHeader, Title } from '../app/components';
import { FormattedMessage } from 'react-intl';

const TodosPage = () => (
  <Box>
    <Title message={linksMessages.todos} />
    {/* This ugly wrapping syntax will be unneccessary with React fiber soon */}
    <FormattedMessage {...linksMessages.todos}>
      {message => <PageHeader heading={message} />}
    </FormattedMessage>
    <NewTodo />
    <Todos />
    <Buttons />
  </Box>
);

export default TodosPage;

// @flow
import Buttons from './Buttons';
import NewTodo from './NewTodo';
import React from 'react';
import Todos from './Todos';
import linksMessages from '../../common/app/linksMessages';
import { Box, PageHeader } from '../../common/components';
import { FormattedMessage } from 'react-intl';
import { Title } from '../components';

const TodosPage = () => (
  <Box>
    <Title message={linksMessages.todos} />
    <FormattedMessage {...linksMessages.todos}>
      {message => <PageHeader heading={message} />}
    </FormattedMessage>
    <NewTodo />
    <Todos />
    <Buttons />
  </Box>
);

export default TodosPage;

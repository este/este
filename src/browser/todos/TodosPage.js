/* @flow */
import NewTodo from './NewTodo';
import React from 'react';
import Todos from './Todos';
import linksMessages from '../../common/app/linksMessages';
import { Box, PageHeader, Title } from '../app/components';
import { injectIntl } from 'react-intl';

// import Buttons from './Buttons';

type TodosPageProps = {
  intl: any,
};

const TodosPage = ({ intl }: TodosPageProps) => (
  <Box>
    <Title message={linksMessages.todos} />
    <PageHeader heading={intl.formatMessage(linksMessages.todos)} />
    <NewTodo />
    <Todos />
    {/* <Buttons /> */}
  </Box>
);

export default injectIntl(TodosPage);

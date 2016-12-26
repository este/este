/* @flow */
// import NewTodo from './NewTodo';
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import { injectIntl } from 'react-intl';
import {
  Box,
  PageHeader,
  Title,
} from '../app/components';

// import Buttons from './Buttons';
// import Todos from './Todos';

type TodosPageProps = {
  intl: any,
};

const TodosPage = ({ intl }: TodosPageProps) => (
  <Box>
    <Title message={linksMessages.todos} />
    <PageHeader heading={intl.formatMessage(linksMessages.todos)} />
    {/* <NewTodo /> */}
    {/* <Todos />
    <Buttons /> */}
  </Box>
);

export default injectIntl(TodosPage);

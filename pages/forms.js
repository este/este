// @flow
import React from 'react';
import Heading from '../components/Heading';
import P from '../components/P';
import Page from '../components/Page';
import UserForm from '../components/UserForm';
import UsersTable from '../components/UsersTable';
import app from '../components/app';
import sitemap from '../lib/sitemap';
import { FormattedMessage } from 'react-intl';

const Forms = ({ intl }) =>
  <Page title={intl.formatMessage(sitemap.forms.title)}>
    <Heading size={3}>
      {intl.formatMessage(sitemap.forms.title)}
    </Heading>
    <P>
      <FormattedMessage
        defaultMessage="Simple, fast, and typed Redux forms without unnecessary abstractions."
        id="forms.description"
      />
    </P>
    <UserForm intl={intl} />
    <UsersTable />
  </Page>;

export default app(Forms);

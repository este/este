// @flow
import React from 'react';
import Heading from '../components/Heading';
import P from '../components/P';
import Page from '../components/Page';
import app from '../components/app';
import sitemap from '../lib/sitemap';
import { FormattedMessage } from 'react-intl';

const Index = ({ intl }) =>
  <Page title={intl.formatMessage(sitemap.index.title)}>
    <Heading size={3}>
      {intl.formatMessage(sitemap.index.title)}
    </Heading>
    <P>
      <FormattedMessage
        defaultMessage="Starter kit for universal apps."
        id="app.description"
      />
    </P>
  </Page>;

export default app(Index);

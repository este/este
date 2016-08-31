/* @flow */
import Helmet from 'react-helmet';
import React from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';

const messages = defineMessages({
  title: {
    defaultMessage: 'Settings',
    id: 'me.settingsPage.title',
  },
});

const SettingsPage = () => (
  <div className="settings-page">
    <FormattedMessage {...messages.title}>
      {message =>
        <Helmet title={message} />
      }
    </FormattedMessage>
    <p>
      <FormattedMessage {...messages.title} />
    </p>
  </div>
);

export default SettingsPage;

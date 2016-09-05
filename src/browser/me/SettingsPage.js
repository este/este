/* @flow */
import React from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';
import { Block, Title, View } from '../app/components';

const messages = defineMessages({
  title: {
    defaultMessage: 'Settings',
    id: 'me.settingsPage.title',
  },
});

const SettingsPage = () => (
  <View>
    <Title message={messages.title} />
    <Block>
      <FormattedMessage {...messages.title} />
    </Block>
  </View>
);

export default SettingsPage;

/* @flow */
import React from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';
import { Block, Title, View } from '../app/components';

const messages = defineMessages({
  title: {
    defaultMessage: 'Profile',
    id: 'me.profilePage.title',
  },
});

const ProfilePage = () => (
  <View>
    <Title message={messages.title} />
    <Block>
      <FormattedMessage {...messages.title} />
    </Block>
  </View>
);

export default ProfilePage;

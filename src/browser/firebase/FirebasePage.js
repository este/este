/* @flow */
import OnlineUsers from '../users/OnlineUsers';
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import { Block, Heading, PageHeader, Title, View } from '../app/components';

const FirebasePage = () => (
  <View>
    <Title message={linksMessages.firebase} />
    <PageHeader
      description="A cloud-hosted database. Data is stored as JSON and
        synchronized in realtime to every connected client."
      heading="Firebase"
    />
    <Heading alt>Online users</Heading>
    <Block>
      <OnlineUsers />
    </Block>
  </View>
);

export default FirebasePage;

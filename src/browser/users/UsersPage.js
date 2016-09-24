/* @flow */
import OnlineUsers from './OnlineUsers';
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import { Block, PageHeader, Title, View } from '../app/components';

const UsersPage = () => (
  <View>
    <Title message={linksMessages.users} />
    <PageHeader
      description="Online users."
      heading="Users"
    />
    <Block>
      <OnlineUsers />
    </Block>
  </View>
);

export default UsersPage;

/* @flow */
import React from 'react';
import {
  Link,
  PageHeader,
  Title,
  View,
} from '../app/components';

const HomePage = () => (
  <View>
    <Title message="ChatX" />
    <PageHeader
      description="Simple realtime multi-channel chat."
      heading="ChatX"
    />
    <Link to="/chat">Access Chat</Link>
  </View>
);

export default HomePage;

/* @flow */
import React from 'react';
import { Image, PageHeader, SwitchTheme, Title, View } from '../app/components';

const HomePage = () => (
  <View>
    <Title message="Este.js" />
    <PageHeader
      description={`Starter kit for universal full–fledged React app. One stack
        for browser, mobile, server.`}
      heading="Este"
    />
    <SwitchTheme />
    <Image alt="50x50 placeholder" mt={2} src={require('./50x50.png')} />
  </View>
);

export default HomePage;

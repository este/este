/* @flow */
import React from 'react';
// import SwitchTheme from './SwitchTheme';
import {
  Box,
  Image,
  Link,
  PageHeader,
  Title,
} from '../app/components';

const HomePage = () => (
  <Box>
    <Title message="Este.js" />
    {/* <PageHeader
      heading="Este"
      description="Starter kit for universal full–fledged React apps. One stack
        for browser, mobile, server."
    /> */}
    <Link to="https://github.com/este/este">
      github.com/este/este
    </Link>
    {/* <SwitchTheme /> */}
    <Box marginVertical="medium">
      <Image
        alt="50x50 placeholder"
        height={50}
        src={require('./50x50.png')}
        width={50}
      />
    </Box>
  </Box>
);

export default HomePage;

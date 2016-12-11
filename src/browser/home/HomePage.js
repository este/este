/* @flow */
import React from 'react';
import {
  Box,
  Image,
  Link,
  PageHeader,
  Heading,
  Paragraph,
  Title,
} from '../app/components';

const HomePage = () => (
  <Box>
    <Title message="Este.js" />
    <PageHeader
      heading="Este"
      description="Starter kit for universal full–fledged React apps. One stack
        for browser, mobile, server."
    />
    <Heading size="biggest">
      How it started
    </Heading>
    {/* <Link display="block" to="https://github.com/este/este">
      github.com/este/este
    </Link> */}
    {/* <SwitchTheme /> */}
    {/* <Paragraph>
      Fok
    </Paragraph>
    <Box marginVertical="medium">
      <Image
        alt="50x50 placeholder"
        height={50}
        src={require('./50x50.png')}
        width={50}
      />
    </Box> */}
  </Box>
);

export default HomePage;

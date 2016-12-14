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
    <Heading size="bigger">
      How it started
    </Heading>
    <Paragraph>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </Paragraph>
    <Paragraph>
      <Link
        display="block"
        marginBottom="medium"
        to="https://github.com/este/este"
      >
        github.com/este/este
      </Link>
    </Paragraph>
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

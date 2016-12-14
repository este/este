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
  Text,
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
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
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
    <Box marginBottom="medium">
      <Text
        backgroundColor="primary"
        bold
        borderRadius={2}
        color="white"
        display="inline-block"
        marginVertical="step14"
        paddingHorizontal="medium"
        paddingVertical="smallest"
        size="small"
        >initial theme</Text>
    </Box>
    {/* <SwitchTheme /> */}
    {/*
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

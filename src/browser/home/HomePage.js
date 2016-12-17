/* @flow */
import React from 'react';
import SwitchTheme from './SwitchTheme';
import {
  Box,
  Heading,
  Image,
  Link,
  PageHeader,
  Paragraph,
  Title,
  Button,
  Text,
  Input
} from '../app/components';

const HomePage = () => (
  <Box>
    <Title message="Este.js" />
    <PageHeader
      heading="Este"
      description="Starter kit for universal full–fledged React apps. One stack
        for browser, mobile, server."
    />
    <Heading size={1}>
      Heading
    </Heading>
    <Paragraph>
      Paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </Paragraph>
    <Paragraph>
      <Link to="https://github.com/este/este">
        github.com/este/este
      </Link>
    </Paragraph>
    <Paragraph>
      <Image
        alt="50x50 placeholder"
        height={50}
        src={require('./50x50.png')}
        width={50}
      />
    </Paragraph>
    {/* primary: '#08e',
    info: '#08e',
    success: '#1c7',
    warning: '#f70',
    danger: '#f52', */}
    <Input placeholder="This is a placeholder"/>
    <Button>Primary</Button>
    <Button>Info</Button>
    <SwitchTheme />
  </Box>
);

export default HomePage;

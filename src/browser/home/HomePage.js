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
} from '../app/components';

const HomePage = () => (
  <Box>
    <Title message="Este.js" />
    <PageHeader
      heading="Este"
      description="Starter kit for universal full–fledged React apps. One stack
        for browser, mobile, server."
    />
    {/* 0 is default text size. Increment or decrement it. */}
    <Heading size={1}>
      Heading
    </Heading>
    <Paragraph>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </Paragraph>
    <Link display="block" to="https://github.com/este/este">
      github.com/este/este
    </Link>
    {/* <br /> and display="block" are the same. */}
    <Text size={0}>normal text</Text><br />
    <Text display="block" size={-1}>small text</Text>
    <Text size={5}>text 5</Text><br />
    <Box marginVertical={1}>
      <Image
        alt="50x50 placeholder"
        height={50}
        src={require('./50x50.png')}
        width={50}
      />
    </Box>
    <Box marginBottom={1}>
      {['primary', 'success', 'warning', 'danger'].map(color => (
        <Button
          backgroundColor={color}
          key={color}
          marginHorizontal="0.5em"
        >{color}</Button>
      ))}
      <Button
        backgroundColor="primary"
        disabled
        marginHorizontal="0.5em"
      >disabled</Button>
      <Button
        backgroundColor="transparent"
        bold={false}
        color="black"
        marginHorizontal="0.5em"
      >black</Button>
    </Box>
    <Heading>
      Switch Theme
    </Heading>
    <SwitchTheme />
  </Box>
);

export default HomePage;

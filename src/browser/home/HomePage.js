/* @flow */
import React from 'react';
import SwitchTheme from './SwitchTheme';
import {
  Box,
  Button,
  Heading,
  Image,
  Link,
  PageHeader,
  Paragraph,
  Text,
  Title,
  ToggleBaseline,
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
    <Link
      display="block"
      marginBottom={1}
      to="https://github.com/este/este"
    >
      github.com/este/este
    </Link>
    <Text size={0}>normal text</Text><br />
    <Text display="block" size={-1}>small text</Text>
    <Text size={5}>text 5</Text><br />
    <Box marginVertical={2}>
      <Image
        alt="50x50 placeholder"
        height={50}
        src={require('./50x50.png')}
        width={50}
      />
    </Box>
    <Box marginBottom={2} marginHorizontal={-0.25}>
      <Button
        // default button? hmm? proc? uvidime

        // primary
        // disabled
        // color="primary"
        // backgroundColor="warning"
        marginHorizontal={0.25}
      >primary</Button>
      {/* {['primary', 'success', 'warning', 'danger'].map(color => (
        <Button
          backgroundColor={color}
          border
          borderColor={color}
          key={color}
          marginHorizontal={0.25}
        >{color}</Button>
      ))}
      <Button
        backgroundColor="primary"
        border
        borderColor="primary"
        disabled
        marginHorizontal={0.25}
      >disabled</Button>
      <Button
        backgroundColor="white"
        bold={false}
        border
        borderWidth={0}
        // borderColor="transparent"
        color="black"
        marginHorizontal={0.25}
      >black</Button> */}
    </Box>
    {/* <SwitchTheme /> */}
    {/* <ToggleBaseline /> */}
  </Box>
);

export default HomePage;

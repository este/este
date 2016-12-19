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
    <Paragraph>
      <Link to="https://github.com/este/este">
        github.com/este/este
      </Link>
    </Paragraph>
    {/* <br /> and display="block" are the same. */}
    <Text size={0}>normal text</Text><br />
    <Text display="block" size={-1}>small text</Text>
    <Text size={5}>text 5</Text><br />
    {/* 1 is the computed baseline. */}
    <Box marginVertical={1.5}>
      {/* Image height is adjusted for the baseline. */}
      <Image
        alt="50x50 placeholder"
        height={50}
        src={require('./50x50.png')}
        width={50}
      />
    </Box>
    <Heading>Buttons</Heading>
    <Box marginBottom={1}>
      {['primary', 'success', 'warning', 'danger'].map((color, i) => (
        <Button
          backgroundColor={color}
          key={color}
          marginLeft={i && '.75em'} // Put some space between buttons only.
        >{color}</Button>
      ))}
      <Button
        backgroundColor="primary"
        disabled
        marginLeft=".75em"
      >disabled</Button>
    </Box>
    {/* Outline buttons. */}
    <Box marginBottom={1}>
      {['primary', 'success', 'warning', 'danger'].map((color, i) => (
        <Button
          backgroundColor={color}
          key={color}
          marginLeft={i && '.75em'}
          outline
        >{color}</Button>
      ))}
      <Button
        backgroundColor="primary"
        disabled
        marginLeft=".75em"
        outline
      >disabled</Button>
    </Box>
    {/* Big outline primary by default button. */}
    <Box marginBottom={1}>
      <Button
        outline
        size={2}
      >Big Outline</Button>
    </Box>
    <SwitchTheme />
  </Box>
);

export default HomePage;

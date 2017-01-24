// @flow
import React from 'react';
import {
  Box,
  Heading,
  Image,
  PageHeader,
  Paragraph,
  Text,
} from '../../common/components';
import {
  Link,
  Title,
} from '../components';


// import {
//   Box,
//   Button,
//   Heading,
//   Image,
//   Link,
//   PageHeader,
//   Paragraph,
//   SwitchTheme,
//   Text,
//   Title,
//   ToggleBaseline,
// } from '../app/components';

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
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </Paragraph>
    <Link
      display="block"
      to="https://github.com/este/este"
    >github.com/este/este</Link>
    <Box marginVertical={1}>
      <Image
        src={require('./50x50.png')}
        alt="50x50 placeholder"
        size={{ height: 50, width: 50 }}
      />
    </Box>
    <Text size={0}>normal text</Text><br />
    <Text display="block" size={-1}>small text</Text>
    <Text size={5}>text 5</Text><br />
    {/* <Box marginVertical={2} marginHorizontal={-0.25}>
      <Button primary marginHorizontal={0.25}>primary</Button>
      <Button success marginHorizontal={0.25}>success</Button>
      <Button warning marginHorizontal={0.25}>warning</Button>
      <Button danger marginHorizontal={0.25}>danger</Button>
      <Button primary disabled marginHorizontal={0.25}>disabled</Button>
      <Button marginHorizontal={0.25}>text</Button>
    </Box>
    <SwitchTheme />
    <ToggleBaseline /> */}
  </Box>
);

export default HomePage;

/* @flow */
import React from 'react';
import {
  Box,
  // Image,
  // Link,
  // PageHeader,
  // SwitchTheme,
  Paragraph,
  Text,
  Title,
  // View,
} from '../app/components';

const HomePage = () => (
  <Box>
    <Title message="Este.js" />
    <Text size="big">fok</Text>
    <Box
      margin="auto"
      width="400"
      textAlign="center"
      style={{ border: 'solid 1px red' }}
    >fok</Box>
  </Box>
  // <View>
  //   <Title message="Este.js" />
  //   <PageHeader
  //     description="Starter kit for universal full–fledged React apps. One stack
  //       for browser, mobile, server."
  //     heading="Este"
  //   />
  //   {/* This is a block with margin-bottom: scale[4]. Inline styles rocks. */}
  //   <Block mb={4}>
  //     <Link to="https://github.com/este/este">
  //       github.com/este/este
  //     </Link>
  //   </Block>
  //   <SwitchTheme />
  //   <Image
  //     alt="50x50 placeholder"
  //     mt={2}
  //     src={require('./50x50.png')}
  //   />
  // </View>
);

export default HomePage;

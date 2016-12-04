/* @flow */
import React from 'react';
import {
  Box,
  // Image,
  // Link,
  // PageHeader,
  // SwitchTheme,
  Text,
  Title,
  // View,
} from '../app/components';

// a mozna to pujde na props komponenty, a pak budu moci mit Text small

const HomePage = () => (
  <Box padding="big" textAlign="center">
    <Title message="Este.js" />
    <Text size="extraBig" transform="uppercase">
      Hura
    </Text>
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

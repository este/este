/* @flow */
import React from 'react';
import {
  Box,
  Image,
  Link,
  PageHeader,
  Paragraph,
  Title,
  Text,
} from '../app/components';

const HomePage = () => (
  <Box>
    <Title message="Este.js" />
    {/* <PageHeader
      heading="Este"
      description="Starter kit for universal full–fledged React apps. One stack
        for browser, mobile, server."
    /> */}
    {/* <Link display="block" to="https://github.com/este/este">
      github.com/este/este
    </Link> */}
    <Text display="block">shit</Text>
    <Text size="big" display="block">shit</Text>
    <Text border="bottom" borderWidth={4} marginBottom="extraSmall" size="extraBig" display="block">shit</Text>
    <Text display="block">shit</Text>
    <Text size="small" display="block">shit</Text>
    <Text size="extraSmall" display="block">shit</Text>
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

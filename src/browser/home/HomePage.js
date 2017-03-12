// @flow
import * as themes from '../themes';
import React from 'react';
import {
  Box,
  Button,
  Heading,
  Image,
  PageHeader,
  Paragraph,
  SwitchTheme,
  Text,
  ToggleBaseline,
} from '../../common/components';
import { Link, Title } from '../components';

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
    <Link display="block" to="https://github.com/este/este">
      github.com/este/este
    </Link>
    <Box marginVertical={1}>
      <Image
        src={require('./50x50.png')}
        alt="50x50 placeholder"
        size={{
          height: 50,
          width: 50,
        }}
      />
    </Box>
    <Text size={0}>normal text</Text>
    <Text display="block" size={-1}>small text</Text>
    <Text size={5}>text 5</Text>
    <Box
      flexDirection="row"
      flexWrap="wrap"
      marginVertical={2}
      marginHorizontal={-0.25}
    >
      <Button primary marginHorizontal={0.25}>Primary</Button>
      <Button success marginHorizontal={0.25}>Success</Button>
      <Button warning marginHorizontal={0.25}>Warning</Button>
      <Button danger marginHorizontal={0.25}>Danger</Button>
      <Button primary disabled marginHorizontal={0.25}>Disabled</Button>
      <Button marginHorizontal={0.25}>Text</Button>
    </Box>
    <SwitchTheme themes={themes} />
    <ToggleBaseline />
  </Box>
);
export default HomePage;

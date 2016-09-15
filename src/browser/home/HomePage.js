/* @flow */
import React from 'react';
import {
  Block,
  Image,
  Link,
  PageHeader,
  SwitchTheme,
  Title,
  View,
} from '../app/components';

const HomePage = () => (
  <View>
    <Title message="Flamingo City." />
    <PageHeader
      description="Fashion blog showcasing designs by Ayeisha Autumn."
      heading="Flamingo City."
    />
    {/* This is a block with margin-bottom: scale[4]. Inline styles rocks. */}
    <Block mb={4}>
      <Link to="https://github.com/este/este">
        github.com/este/este
      </Link>
    </Block>
    <SwitchTheme />
    <Image
      alt="50x50 placeholder"
      mt={2}
      src={require('./50x50.png')}
    />
  </View>
);

export default HomePage;

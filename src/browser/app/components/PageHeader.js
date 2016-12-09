/* @flow */
import Box from './Box';
import Heading from './Heading';
import React from 'react';
import Text from './Text';

type PageHeaderProps = {|
  heading: string,
  description: string,
|};

const Container = (props) => (
  <Box
    border="bottom"
    borderWidth="2"
    marginVertical="extraBig"
    paddingBottom="medium"
    paddingTop="big"
    {...props}
  />
);

const PageHeader = (props: PageHeaderProps) => (
  <Container>
    <Heading size="extraBig">{props.heading}</Heading>
    <Text display="block">{props.description}</Text>
  </Container>
);

export default PageHeader;

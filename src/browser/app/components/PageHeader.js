/* @flow */
import Box from './Box';
import Heading from './Heading';
import React from 'react';
import Text from './Text';

const Container = (props) => (
  <Box
    border="bottom"
    borderWidth={2}
    marginVertical="small"
    paddingBottom="smaller"
    {...props}
  />
);

type PageHeaderProps = {|
  heading: string,
  description: string,
|};

const PageHeader = (props: PageHeaderProps) => (
  <Container>
    <Heading size="biggest">{props.heading}</Heading>
    {/* // TODO: Paragraph */}
    <Text display="block">{props.description}</Text>
  </Container>
);

export default PageHeader;

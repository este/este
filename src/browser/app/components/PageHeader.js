/* @flow */
import Box from './Box';
import Heading from './Heading';
import Paragraph from './Paragraph';
import React from 'react';

type PageHeaderProps = {|
  heading: string,
  description: string,
|};

const PageHeader = (props: PageHeaderProps) => (
  <Box
    border="bottom"
    borderWidth={2}
    marginBottom={5/2}
    marginTop={2}
    paddingBottom={1/2}
  >
    <Heading size={2} marginBottom={0}>{props.heading}</Heading>
    <Paragraph marginBottom={0}>{props.description}</Paragraph>
  </Box>
);

export default PageHeader;

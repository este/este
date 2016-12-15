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
    marginBottom="big"
    marginTop="big"
    paddingBottom="medium"
  >
    <Heading size={3} marginBottom={0}>{props.heading}</Heading>
    <Paragraph marginBottom={0}>{props.description}</Paragraph>
  </Box>
);

export default PageHeader;

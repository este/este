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
    <Heading size="biggest" marginBottom="step0">{props.heading}</Heading>
    <Paragraph marginBottom="step0">{props.description}</Paragraph>
  </Box>
);

export default PageHeader;

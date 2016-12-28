/* @flow */
import Box from './Box';
import Heading from './Heading';
import Paragraph from './Paragraph';
import React from 'react';

type PageHeaderProps = {|
  heading: string,
  description?: string,
|};

const PageHeader = ({ heading, description }: PageHeaderProps) => (
  <Box
    border="bottom"
    borderWidth={2}
    marginBottom={2.5}
    marginTop={2}
    paddingBottom={0.5}
  >
    <Heading size={3} marginBottom={0}>{heading}</Heading>
    {description &&
      <Paragraph marginBottom={0}>{description}</Paragraph>
    }
  </Box>
);

export default PageHeader;

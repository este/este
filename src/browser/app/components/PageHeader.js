/* @flow */
import Box from './Box';
import Heading from './Heading';
import React from 'react';
import Text from './Text';

type PageHeaderProps = {| // Flow exact object type prevents typos in props.
  heading: string,
  description: string,
|};

const PageHeader = (props: PageHeaderProps) => (
  <Box
    border="bottom"
    borderWidth="2"
    marginVertical="extraBig"
    paddingBottom="medium"
    paddingTop="big"
  >
    <Heading size="extraBig">{props.heading}</Heading>
    <Text display="block">{props.description}</Text>
  </Box>
);

export default PageHeader;

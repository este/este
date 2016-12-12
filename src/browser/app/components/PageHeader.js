/* @flow */
import Box from './Box';
import React from 'react';
import Text from './Text';

type PageHeaderProps = {|
  heading: string,
  description: string,
|};

const PageHeader = (props: PageHeaderProps) => (
  <Box
    // border="bottom"
    // borderWidth={2}
    // marginBottom="big"
    // marginTop="big"
    // paddingBottom="medium"
  >
    <Text display="block" size="biggest" bold>{props.heading}</Text>
    <Text display="block">{props.description}</Text>
  </Box>
);

export default PageHeader;

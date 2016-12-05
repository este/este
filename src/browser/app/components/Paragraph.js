/* @flow */
import Box from './Box';
import React from 'react';
import Text from './Text';

const Paragraph = (props: any) => (
  <Box marginBottom="big" marginTop="small">
    <Text>{props.children}</Text>
  </Box>
);

export default Paragraph;

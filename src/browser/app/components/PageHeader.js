/* @flow */
import Box from './Box';
import React from 'react';
import Text from './Text';

type PageHeaderProps = {|
  heading: string,
  description: string,
|};

const Style = (props) => (
  <Box
    border="bottom"
    borderWidth={6}
    marginVertical="small"
    paddingBottom="smaller"
    {...props}
  />
);

const PageHeader = (props: PageHeaderProps) => (
  <Style>
    <Text size="biggest" display="block">{props.heading}</Text>
    <Text display="block">{props.description}</Text>
  </Style>
);

export default PageHeader;

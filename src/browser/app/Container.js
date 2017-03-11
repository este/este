// @flow
import React from 'react';
import { Box } from '../../common/components';

type ContainerProps = {
  children?: any,
};

const Container = ({ children }: ContainerProps) => (
  <Box
    margin="auto"
    paddingHorizontal={1}
    style={theme => ({
      maxWidth: theme.container.maxWidths.big,
      minHeight: '100vh', // make footer sticky
    })}
  >
    {children}
  </Box>
);

export default Container;

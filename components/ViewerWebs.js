// @flow
import Text from './Text';
import React from 'react';
import Box from './Box';
import { FormattedMessage } from 'react-intl';

const ViewerWebs = () => (
  <Box marginBottom={1}>
    <Text>
      <FormattedMessage
        defaultMessage="You don't have any web yet. Create a new one."
        id="viewerWebs.noWebCreatedYet"
      />
    </Text>
  </Box>
);

export default ViewerWebs;

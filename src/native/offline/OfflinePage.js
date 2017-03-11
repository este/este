// @flow
import type { State } from '../../common/types';
import React from 'react';
import { Box, Text } from '../../common/components';
import { connect } from 'react-redux';

type OfflinePageProps = {
  online: boolean,
};

const OfflinePage = (
  {
    online,
  }: OfflinePageProps,
) => (
  <Box alignItems="center" justifyContent="center" flex={1}>
    <Text>state.app.online: {online.toString()}</Text>
  </Box>
);

export default connect((state: State) => ({
  online: state.app.online,
}))(OfflinePage);

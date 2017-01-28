// @flow
import type { State } from '../../common/types';
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import { connect } from 'react-redux';
import { Box, PageHeader, Text } from '../../common/components';
import { Title } from '../components';

type OfflinePageProps = { online: boolean };

const OfflinePage = ({ online }: OfflinePageProps) => (
  <Box>
    <Title message={linksMessages.offline} />
    <PageHeader heading="Offline" />
    <Text>state.app.online: {online.toString()}</Text>
  </Box>
);

export default connect((state: State) => ({ online: state.app.online }))(
  OfflinePage,
);

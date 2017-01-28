// @flow
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import { Box, Paragraph } from '../../common/components';
import { FormattedMessage } from 'react-intl';
import { Title } from '../components';

const SettingsPage = () => (
  <Box>
    <Title message={linksMessages.settings} />
    <FormattedMessage {...linksMessages.settings}>
      {message => <Paragraph>{message}</Paragraph>}
    </FormattedMessage>
  </Box>
);

export default SettingsPage;

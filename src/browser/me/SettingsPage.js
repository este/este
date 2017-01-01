// @flow
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import { FormattedMessage } from 'react-intl';
import {
  Box,
  Paragraph,
  Title,
} from '../app/components';

const SettingsPage = () => (
  <Box>
    <Title message={linksMessages.settings} />
    <Paragraph>
      <FormattedMessage {...linksMessages.settings} />
    </Paragraph>
  </Box>
);

export default SettingsPage;

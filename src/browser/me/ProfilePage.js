// @flow
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import { FormattedMessage } from 'react-intl';
import {
  Box,
  Paragraph,
  Title,
} from '../app/components';

const ProfilePage = () => (
  <Box>
    <Title message={linksMessages.profile} />
    <Paragraph>
      <FormattedMessage {...linksMessages.profile} />
    </Paragraph>
  </Box>
);

export default ProfilePage;

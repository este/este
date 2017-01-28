// @flow
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import { Box, Paragraph } from '../../common/components';
import { FormattedMessage } from 'react-intl';
import { Title } from '../components';

const ProfilePage = () => (
  <Box>
    <Title message={linksMessages.profile} />
    <FormattedMessage {...linksMessages.profile}>
      {message => <Paragraph>{message}</Paragraph>}
    </FormattedMessage>
  </Box>
);

export default ProfilePage;

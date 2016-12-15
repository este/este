/* @flow */
import React from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';
import { Box, Text, Link } from './components';

const messages = defineMessages({
  madeByHtml: {
    defaultMessage: 'Made with love by',
    id: 'footer.madeByHtml',
  },
});

const Footer = () => (
  <Box
    border="top"
    marginTop="medium"
    paddingVertical="medium"
  >
    <Text size={-1}>
      <FormattedMessage {...messages.madeByHtml} />
    </Text>
    {'\u00a0'}
    <Link size={-1} to="https://twitter.com/steida">
      steida
    </Link>
  </Box>
);

export default Footer;

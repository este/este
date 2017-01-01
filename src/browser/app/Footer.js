// @flow
import React from 'react';
import { Box, Text, Link } from './components';
import { FormattedMessage, defineMessages } from 'react-intl';

const messages = defineMessages({
  madeByHtml: {
    defaultMessage: 'Made with love by',
    id: 'footer.madeByHtml',
  },
});

const Footer = () => (
  <Box
    border="top"
    marginTop={1}
    paddingVertical={1}
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

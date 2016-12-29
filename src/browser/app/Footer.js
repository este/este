// @flow
import type { Intl } from '../../common/types';
import React from 'react';
import { Box, Text, Link } from './components';
import { defineMessages, injectIntl } from 'react-intl';

const messages = defineMessages({
  madeByHtml: {
    defaultMessage: 'Made with love by',
    id: 'footer.madeByHtml',
  },
});

type FooterProps = {
  intl: Intl,
};

const Footer = ({ intl }: FooterProps) => (
  <Box
    border="top"
    marginTop={1}
    paddingVertical={1}
  >
    <Text size={-1}>
      {intl.formatMessage(messages.madeByHtml)}
    </Text>
    {'\u00a0'}
    <Link size={-1} to="https://twitter.com/steida">
      steida
    </Link>
  </Box>
);

export default injectIntl(Footer);

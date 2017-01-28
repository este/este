// @flow
import React from 'react';
import { Box, Text } from '../../common/components';
import { FormattedMessage, defineMessages } from 'react-intl';
import { Link } from '../components';

const messages = defineMessages({
  madeByHtml: {
    defaultMessage: 'Made with love by',
    id: 'footer.madeByHtml',
  },
});

const Footer = () => (
  <Box
    borderTopWidth={1}
    borderStyle="solid"
    flexDirection="row"
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

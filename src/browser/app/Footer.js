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

const Container = (props) => (
  <Box
    border="top"
    borderWidth={1}
    paddingVertical="smaller"
    {...props}
  />
);

const Footer = () => (
  <Container>
    <Text size="small">
      <FormattedMessage {...messages.madeByHtml} />
    </Text>
    {'\u00a0'}
    <Link size="small" to="https://twitter.com/steida">
      steida
    </Link>
  </Container>
);

export default Footer;

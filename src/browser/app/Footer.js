/* @flow */
import React from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';
import { Text, Link, style } from './components';

const messages = defineMessages({
  madeByHtml: {
    defaultMessage: 'Made with love by',
    id: 'footer.madeByHtml',
  },
});

const Footer = style((props, theme) => ({
  alignItems: 'center',
  borderTop: `solid 1px ${theme.border.color}`,
  display: 'flex',
  flexWrap: 'wrap',
  marginTop: theme.scales.big,
  paddingBottom: theme.scales.big,
  paddingTop: theme.scales.big,
}));

export default () => (
  <Footer>
    <Text small>
      <FormattedMessage {...messages.madeByHtml} />
    </Text>
    {'\u00a0'}
    <Link small to="https://twitter.com/steida">
      steida
    </Link>
  </Footer>
);

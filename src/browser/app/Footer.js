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

const Style = style(theme => ({
  alignItems: 'center',
  borderTop: `solid 1px ${theme.colors.gray}`,
  display: 'flex',
  flexWrap: 'wrap',
  marginTop: theme.sizes.big,
  paddingBottom: theme.sizes.big,
  paddingTop: theme.sizes.big,
}), 'footer');

const Footer = () => (
  <Style>
    <Text size="small">
      <FormattedMessage {...messages.madeByHtml} />
    </Text>
    {'\u00a0'}
    <Link size="small" to="https://twitter.com/steida">
      steida
    </Link>
  </Style>
);

export default Footer;

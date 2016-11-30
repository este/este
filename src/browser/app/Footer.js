/* @flow */
import type { Theme } from './themes';
import React from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';
import { Text, Link } from './components';
import { createComponent } from 'react-fela';

const messages = defineMessages({
  madeByHtml: {
    defaultMessage: 'Made with love by',
    id: 'footer.madeByHtml',
  },
});

export const footerStyles = (props: { theme: Theme }) => ({
  alignItems: 'center',
  borderTop: `solid 1px ${props.theme.border.color}`,
  display: 'flex',
  flexWrap: 'wrap',
  marginTop: `${props.theme.scales.big}px`,
  paddingBottom: `${props.theme.scales.big}px`,
  paddingTop: `${props.theme.scales.big}px`,
});

const Footer = createComponent(footerStyles, 'footer');

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

/* @flow */
import React from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';

const messages = defineMessages({
  madeByHtml: {
    defaultMessage: 'Made with love by',
    id: 'footer.madeByHtml',
  },
});

const Footer = () => (
  <footer>
    <p>
      <FormattedMessage {...messages.madeByHtml} />
      {' '}
      <a href="https://twitter.com/steida">steida</a>
    </p>
  </footer>
);

export default Footer;

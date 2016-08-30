/* @flow */
import React from 'react';
import { Link } from './components';
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
      <Link to="https://twitter.com/steida">steida</Link>
    </p>
  </footer>
);

export default Footer;

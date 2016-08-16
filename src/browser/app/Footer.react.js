import React, { Component } from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';

const messages = defineMessages({
  madeByHtml: {
    defaultMessage: 'Made with love by',
    id: 'footer.madeByHtml',
  },
});

export default class Footer extends Component {

  render() {
    return (
      <footer>
        <p>
          <FormattedMessage {...messages.madeByHtml} />
          {' '}
          <a href="https://twitter.com/steida">steida</a>
        </p>
      </footer>
    );
  }

}

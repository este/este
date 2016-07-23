import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import Locales from './Locales.react';
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import {
  FormattedDate,
  FormattedMessage,
  FormattedNumber,
  FormattedRelative,
  defineMessages,
} from 'react-intl';

const messages = defineMessages({
  h2: {
    defaultMessage: 'react-intl demonstration',
    id: 'intl.page.h2',
  },
  unreadCount: {
    defaultMessage: `{unreadCount, plural,
      one {message}
      other {messages}
    }`,
    id: 'intl.page.unreadCount',
  },
});

export default class IntlPage extends Component {

  constructor() {
    super();
    this.componentRenderedAt = Date.now();
  }

  render() {
    // To remember beloved −123 min. https://www.youtube.com/watch?v=VKOv1I8zKso
    const unreadCount = 123;

    return (
      <div className="intl-page">
        <FormattedMessage {...linksMessages.intl}>
          {message => <Helmet title={message} />}
        </FormattedMessage>
        <h2>
          <FormattedMessage {...messages.h2} />
        </h2>
        <Locales />
        <p>
          <FormattedDate
            value={Date.now()}
            day="numeric"
            month="long"
            year="numeric"
            formatMatcher="basic" // while this bug remains in react-intl: https://github.com/andyearnshaw/Intl.js/issues/179
          />
        </p>
        <p>
          <FormattedNumber value={unreadCount} /> {' '}
          <FormattedMessage {...messages.unreadCount} values={{ unreadCount }} />
        </p>
        <p>
          <FormattedRelative
            initialNow={this.componentRenderedAt}
            updateInterval={1000 * 1}
            value={this.componentRenderedAt}
          />
        </p>
      </div>
    );
  }

}

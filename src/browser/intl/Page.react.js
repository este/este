import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import Locales from './Locales.react';
import React from 'react';
import {
  FormattedDate,
  FormattedMessage,
  FormattedNumber,
  FormattedRelative,
  defineMessages,
  injectIntl,
  intlShape
} from 'react-intl';

const messages = defineMessages({
  h2: {
    defaultMessage: 'react-intl demonstration',
    id: 'intl.page.h2'
  },
  title: {
    defaultMessage: 'Intl',
    id: 'intl.page.title'
  },
  unreadCount: {
    defaultMessage: `{unreadCount, plural,
      one {message}
      other {messages}
    }`,
    id: 'intl.page.unreadCount'
  }
});

class Page extends Component {

  static propTypes = {
    intl: intlShape.isRequired
  };

  constructor(props) {
    super(props);
    this.componentRenderedAt = Date.now();
  }

  render() {
    const { intl } = this.props;
    const title = intl.formatMessage(messages.title);
    // To remember beloved −123 min. https://www.youtube.com/watch?v=VKOv1I8zKso
    const unreadCount = 123;

    return (
      <div className="intl-page">
        <Helmet title={title} />
        <h2>
          <FormattedMessage {...messages.h2} />
        </h2>
        <Locales />
        <p>
          <FormattedDate
            value={Date.now()}
            {...{ day: 'numeric', month: 'long', year: 'numeric' }}
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

export default injectIntl(Page);

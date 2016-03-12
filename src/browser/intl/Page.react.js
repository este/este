import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
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

  render() {
    const { intl } = this.props;
    const title = intl.formatMessage(messages.title);
    const unreadCount = 42007;

    return (
      <div className="intl-page">
        <Helmet title={title} />
        <h2>
          <FormattedMessage {...messages.h2} />
        </h2>
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
            value={Date.now()}
            updateInterval={1000 * 5}
          />
        </p>
      </div>
    );
  }

}

export default injectIntl(Page);

import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React from 'react';
import * as reactIntl from 'react-intl';

const {
  FormattedDate,
  FormattedMessage,
  FormattedNumber,
  FormattedPlural,
  FormattedRelative,
  defineMessages,
  injectIntl,
  intlShape
} = reactIntl;

const messages = defineMessages({
  h2: {
    defaultMessage: 'react-intl demonstration',
    id: 'intl.page.h2'
  },
  title: {
    defaultMessage: 'Intl',
    id: 'intl.page.title'
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
          <FormattedPlural value={unreadCount}
            one="message"
            other="messages"
          />
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

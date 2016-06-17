import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import { FormattedHTMLMessage, FormattedMessage, defineMessages } from 'react-intl';

const messages = defineMessages({
  intro: {
    defaultMessage: `
      <p>
        Ahoy, this is the
        <a target="_blank" href="https://github.com/este/este">Este</a> dev stack.
      </p>
    `,
    id: 'home.intro'
  }
});

export default class HomePage extends Component {

  render() {
    return (
      <div className="home-page">
        {/* Note child is a function, so we can localize anything. */}
        <FormattedMessage {...linksMessages.home}>
          {message => <Helmet title={message} />}
        </FormattedMessage>
        <FormattedHTMLMessage {...messages.intro} />
        {/* Use require for assets. It's super useful for CDN. */}
        <img alt="50x50 placeholder" src={require('./50x50.png')} />
      </div>
    );
  }

}

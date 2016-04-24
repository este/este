import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import { FormattedHTMLMessage, defineMessages, injectIntl, intlShape } from 'react-intl';

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

class HomePage extends Component {

  static propTypes = {
    intl: intlShape.isRequired
  };

  render() {
    const { intl } = this.props;
    const title = intl.formatMessage(linksMessages.home);

    return (
      <div className="home-page">
        <Helmet title={title} />
        <FormattedHTMLMessage {...messages.intro} />
        {/* Use require for assets. It's super useful for CDN. */}
        <img alt="50x50 placeholder" src={require('./50x50.png')} />
      </div>
    );
  }

}

export default injectIntl(HomePage);

import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import Login from './Login.react';
import React, { PropTypes } from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

const messages = defineMessages({
  title: {
    defaultMessage: 'Login',
    id: 'auth.page.title'
  }
});

class Page extends Component {

  static propTypes = {
    intl: intlShape.isRequired,
    location: PropTypes.object
  };

  render() {
    const { intl, location } = this.props;
    const title = intl.formatMessage(messages.title);

    return (
      <div className="login-page">
        <Helmet title={title} />
        <Login location={location} />
      </div>
    );
  }

}

export default injectIntl(Page);

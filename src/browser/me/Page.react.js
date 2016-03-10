import './Page.scss';
import AuthLogout from '../auth/Logout.react';
import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React, { PropTypes } from 'react';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { Link } from 'react-router';
import { connect } from 'react-redux';

const messages = defineMessages({
  title: {
    defaultMessage: 'Me',
    id: 'me.page.title'
  },
  welcome: {
    defaultMessage: 'Hi {email}. This is your secret page.',
    id: 'me.page.welcome'
  },
  linkToProfile: {
    defaultMessage: 'Profile',
    id: 'me.page.linkToProfile'
  },
  linkToSettings: {
    defaultMessage: 'Settings',
    id: 'me.page.linkToSettings'
  },
});

class Page extends Component {

  static propTypes = {
    children: PropTypes.object,
    intl: intlShape.isRequired,
    viewer: PropTypes.object
  };

  render() {
    const { children, intl, viewer: { email } } = this.props;
    const title = intl.formatMessage(messages.title);

    return (
      <div className="me-page">
        <Helmet title={title} />
        <ul>
          <li><Link activeClassName="active" to="/me/profile">
            <FormattedMessage {...messages.linkToProfile} />
          </Link></li>
          <li><Link activeClassName="active" to="/me/settings">
            <FormattedMessage {...messages.linkToSettings} />
          </Link></li>
        </ul>
        {children ||
          <p>
            <FormattedMessage {...messages.welcome} values={{ email }} />
          </p>
        }
        <AuthLogout />
      </div>
    );
  }

}

Page = injectIntl(Page);

export default connect(state => ({
  viewer: state.users.viewer
}))(Page);

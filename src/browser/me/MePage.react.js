import './MePage.scss';
import AuthLogout from '../auth/Logout.react';
import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React, { PropTypes } from 'react';
import linksMessages from '../../common/app/linksMessages';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { Link } from 'react-router';
import { connect } from 'react-redux';

const messages = defineMessages({
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

class MePage extends Component {

  static propTypes = {
    children: PropTypes.object,
    intl: intlShape.isRequired,
    viewer: PropTypes.object
  };

  render() {
    const { children, intl, viewer: { email } } = this.props;
    const title = intl.formatMessage(linksMessages.me);

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

MePage = injectIntl(MePage);

export default connect(state => ({
  viewer: state.users.viewer
}))(MePage);

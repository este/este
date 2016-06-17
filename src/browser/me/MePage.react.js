import './MePage.scss';
import AuthLogout from '../auth/Logout.react';
import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React, { PropTypes } from 'react';
import linksMessages from '../../common/app/linksMessages';
import { FormattedMessage, defineMessages } from 'react-intl';
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
    viewer: PropTypes.object
  };

  render() {
    const { children, viewer: { email } } = this.props;

    return (
      <div className="me-page">
        <FormattedMessage {...linksMessages.me}>
          {message => <Helmet title={message} />}
        </FormattedMessage>
        <ul>
          <li>
            <Link activeClassName="active" to="/me/profile">
              <FormattedMessage {...messages.linkToProfile} />
            </Link>
          </li>
          <li>
            <Link activeClassName="active" to="/me/settings">
              <FormattedMessage {...messages.linkToSettings} />
            </Link>
          </li>
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

export default connect(state => ({
  viewer: state.users.viewer
}))(MePage);

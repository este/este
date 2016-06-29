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
    defaultMessage: 'Hi {displayName}. This is your secret page.',
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
    viewer: PropTypes.object.isRequired
  };

  render() {
    const { children, viewer } = this.props;
    const displayName = viewer.displayName || viewer.email;
    const { profileImageURL } = viewer;

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
          <div>
            {profileImageURL &&
              <img role="presentation" src={profileImageURL} />
            }
            <p>
              <FormattedMessage {...messages.welcome} values={{ displayName }} />
            </p>
            <AuthLogout />
          </div>
        }
      </div>
    );
  }

}

export default connect(state => ({
  viewer: state.users.viewer
}))(MePage);

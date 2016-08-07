import './MePage.scss';
import Gravatar from 'react-gravatar';
import Helmet from 'react-helmet';
import React, { Component, PropTypes } from 'react';
import SignOut from '../auth/SignOut.react';
import linksMessages from '../../common/app/linksMessages';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class MePage extends Component {

  static propTypes = {
    children: PropTypes.object,
    viewer: PropTypes.object.isRequired,
  };

  render() {
    const { children, viewer } = this.props;
    const { displayName, email, photoURL } = viewer;

    return (
      <div className="me-page">
        <FormattedMessage {...linksMessages.me}>
          {message =>
            <Helmet title={message} />
          }
        </FormattedMessage>
        <ul>
          <li>
            <Link activeClassName="active" to="/me/profile">
              <FormattedMessage {...linksMessages.profile} />
            </Link>
          </li>
          <li>
            <Link activeClassName="active" to="/me/settings">
              <FormattedMessage {...linksMessages.settings} />
            </Link>
          </li>
        </ul>
        {children ||
          <div>
            <p>{displayName}</p>
            {photoURL ?
              <img role="presentation" src={photoURL} />
            :
              <Gravatar
                default="retro"
                email={email}
                https
                rating="x"
                size={100}
              />
            }
            <SignOut />
          </div>
        }
      </div>
    );
  }

}

export default connect(state => ({
  viewer: state.users.viewer,
}))(MePage);

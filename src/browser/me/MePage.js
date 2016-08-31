import Gravatar from 'react-gravatar';
import Helmet from 'react-helmet';
import React from 'react';
import SignOut from '../auth/SignOut';
import linksMessages from '../../common/app/linksMessages';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import { connect } from 'react-redux';

const styles = {
  ul: {
    padding: 0,
  },
  li: {
    display: 'inline-block',
    marginRight: '1em',
  },
  active: {
    fontWeight: 'normal',
    textDecoration: 'underline',
  },
};

const MePage = ({ children, viewer }) => {
  const { displayName, email, photoURL } = viewer;

  return (
    <div className="me-page">
      <FormattedMessage {...linksMessages.me}>
        {message =>
          <Helmet title={message} />
        }
      </FormattedMessage>
      <ul style={styles.ul}>
        <li style={styles.li}>
          <Link activeStyle={styles.active} to="/me/profile">
            <FormattedMessage {...linksMessages.profile} />
          </Link>
        </li>
        <li style={styles.li}>
          <Link activeStyle={styles.active} to="/me/settings">
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
};

MePage.propTypes = {
  children: React.PropTypes.object,
  viewer: React.PropTypes.object.isRequired,
};

export default connect(state => ({
  viewer: state.users.viewer,
}))(MePage);

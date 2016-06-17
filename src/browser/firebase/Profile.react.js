import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import buttonsMessages from '../../common/app/buttonsMessages';
import { FormattedMessage, defineMessages } from 'react-intl';
import { connect } from 'react-redux';
import { logout } from '../../common/auth/actions';

const messages = defineMessages({
  greeting: {
    defaultMessage: 'Hi',
    id: 'firebase.profile.greeting'
  }
});

class Profile extends Component {

  static propTypes = {
    logout: PropTypes.func.isRequired,
    viewer: PropTypes.object.isRequired
  };

  render() {
    const { logout, viewer } = this.props;

    return (
      <div className="firebase-profile">
        <h2>
          <FormattedMessage {...messages.greeting} />{' '}
          {viewer.displayName || viewer.email}!
        </h2>
        {viewer.profileImageURL &&
          <div className="profile-image">
            <img alt="Profile" src={viewer.profileImageURL} />
          </div>
        }
        <button
          className="btn btn-secondary-outline"
          onClick={logout}
        >
          <FormattedMessage {...buttonsMessages.logout} />
        </button>
      </div>
    );
  }

}

export default connect(state => ({
  viewer: state.users.viewer
}), { logout })(Profile);

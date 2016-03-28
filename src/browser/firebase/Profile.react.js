import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { logout } from '../../common/auth/actions';

const messages = defineMessages({
  greeting: {
    defaultMessage: 'Hi',
    id: 'firebase.profile.greeting'
  },
  logout: {
    defaultMessage: 'Logout',
    id: 'firebase.profile.logout'
  }
});

class Profile extends Component {

  static propTypes = {
    intl: intlShape.isRequired,
    logout: PropTypes.func.isRequired,
    viewer: PropTypes.object.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    const { logout } = this.props;
    // Redirect user to root page before logout since logout recycles app state.
    this.context.router.replace('/');
    logout();
  }

  render() {
    const { viewer } = this.props;

    return (
      <div className="firebase-profile">
        <h2>
          <FormattedMessage {...messages.greeting} /> {viewer.displayName || viewer.email}!
        </h2>
        {viewer.profileImageURL &&
          <div className="profile-image">
            <img src={viewer.profileImageURL} />
          </div>
        }
        <button
          className="btn btn-secondary-outline"
          onClick={this.logout}
        >
          <FormattedMessage {...messages.logout} />
        </button>
      </div>
    );
  }

}

Profile = injectIntl(Profile);

export default connect(state => ({
  viewer: state.users.viewer
}), { logout })(Profile);

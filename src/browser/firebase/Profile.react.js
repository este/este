import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {logout} from '../../common/auth/actions';

class Profile extends Component {

  static propTypes = {
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
    const {logout} = this.props;
    // Redirect user to root page before logout since logout recycles app state.
    this.context.router.replace('/');
    logout();
  }

  render() {
    const {viewer} = this.props;

    return (
      <div className="firebase-profile">
        <h2>Hi {viewer.displayName || viewer.email}!</h2>
        {viewer.profileImageURL &&
          <div className="profile-image">
            <img src={viewer.profileImageURL} />
          </div>
        }
        <button
          className="btn btn-secondary-outline"
          onClick={this.logout}
        >Logout</button>
      </div>
    );
  }

}

export default connect(state => ({
  viewer: state.users.viewer
}), {logout})(Profile);

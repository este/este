import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {logout} from '../../common/auth/actions';

class Profile extends Component {

  static propTypes = {
    logout: PropTypes.func.isRequired,
    viewer: PropTypes.object.isRequired
  };

  render() {
    const {logout, viewer} = this.props;

    return (
      <div className="firebase-profile">
        <h2>Hi {viewer.displayName || viewer.email}</h2>
        {viewer.profileImageURL &&
          <div className="profile-image">
            <img src={viewer.profileImageURL} />
          </div>
        }
        <button
          className="btn btn-secondary-outline"
          onClick={logout}
        >Logout</button>
      </div>
    );
  }

}

export default connect(state => ({
  viewer: state.users.viewer
}), {logout})(Profile);

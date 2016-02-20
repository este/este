import './Page.scss';
import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {login} from '../../common/lib/redux-firebase/actions';
import {logout} from '../../common/auth/actions';

class Login extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    viewer: PropTypes.object
  };

  render() {
    const {auth, login, logout, viewer} = this.props;

    return (
      <div className="firebase-login">
        {viewer ?
          <div className="user-logged-in">
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
        :
          <div className="user-logged-out">
            <button
              className="btn btn-primary btn-lg"
              disabled={auth.formDisabled}
              onClick={login}
            >Facebook Login</button>
            {auth.formError &&
              <p className="error-message">{auth.formError.message}</p>
            }
          </div>
        }
      </div>
    );
  }

}

export default connect(state => ({
  auth: state.auth,
  viewer: state.users.viewer
}), {login, logout})(Login);

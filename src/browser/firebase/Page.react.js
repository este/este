import './Page.scss';
import * as firebaseActions from '../../common/lib/redux-firebase/actions';
import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

class Page extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    viewer: PropTypes.object
  };

  render() {
    const {auth, login, logout, viewer} = this.props;

    return (
      <div className="firebase-page">
        <Helmet title="Firebase" />
        <h2>
          <a href="https://www.firebase.com/" target="_blank">
            <img height="27" src={require('./FirebaseLogo.png')} width="140" />
          </a>
        </h2>
        {viewer ?
          <div className="user-logged-in">
            <h2>Hi {viewer.displayName || viewer.email}</h2>
            <img className="profile-image" src={viewer.profileImageURL} />
            <br />
            <button onClick={logout}>Logout</button>
          </div>
        :
          <div className="user-logged-out">
            <p>Firebase integration to Este and Redux.</p>
            <button
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
}), firebaseActions)(Page);

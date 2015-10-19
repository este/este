import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';
//import './intro.scss';

export default class UserStats extends Component {

  static propTypes = {
    profile: PropTypes.object.isRequired,
    isUserViewer: PropTypes.bool.isRequired,
  }

  render() {
    const {profile, isUserViewer} = this.props;

    let button = (<button type="button" className="follow-btn">Follow</button>);
    if (isUserViewer) {
      button = (<button type="button" className="follow-btn">Edit Profile</button>);
    } else if (profile.get('viewerIsFollowing')) {
      button = (<button type="button" className="follow-btn">Stop Following</button>);
    }

    return (
      <div className="profile-header-user-stats">
        {button}
        <ul className="stats">
          <li className="following">
            <a href="">
              <span className="value">{profile.get('following')}</span>
              {' '}
              <span className="label">Following</span>
            </a>
          </li>
          <li className="followers">
            <a href="">
              <span className="value">{profile.get('followers')}</span>
              {' '}
              <span className="label">Followers</span>
            </a>
          </li>
        </ul>
      </div>
    );
  }

}

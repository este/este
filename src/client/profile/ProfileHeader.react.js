import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import LargeAvatar from './LargeAvatar.react';
import UserBrief from './UserBrief.react';

export default class ProfileHeader extends Component {

  static propTypes = {
    profile: PropTypes.object.isRequired,
    viewer: PropTypes.object.isRequired,
  }

  render() {
    const {profile, viewer} = this.props;

    return (
      <div className="profile-header">
        <LargeAvatar img={profile.get('img')}/>
        <UserBrief profile={profile} viewer={viewer}/>
      </div>
    );
  }

}

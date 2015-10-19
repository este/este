import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import UserStats from './UserStats.react'

export default class UserBrief extends Component {

  static propTypes = {
    profile: PropTypes.object.isRequired,
    viewer: PropTypes.object.isRequired,
  }

  render() {
    const {profile, viewer} = this.props;

    const isUserViewer = profile.get('id') === viewer.get('id');

    return (
      <div className="profile-header-user">
        <div className="profile-header-user-info contributor">
          <h1 className="user-name">
            {profile.get('name')}
            <i className="icon-rate"></i>
          </h1>
          <p className="user-details">Executive Director Edvisions Schools</p>
          <div className="user-links">
            <a href={profile.get('orgUrl')} className="url">
              {profile.get('org')}
            </a>
            {' '}
            <span className="place">{profile.get('location')}</span>
          </div>
        </div>

        <UserStats profile={profile} isUserViewer={isUserViewer}/>

      </div>
    );
  }

}

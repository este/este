import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import fetch from '../../common/components/fetch';
import {loadProfile} from '../../common/profile/actions';

@fetch(loadProfile)
export default class TabEvents extends Component {

  static propTypes = {
    profile: PropTypes.object.isRequired,
  }

  render() {

    const {profile} = this.props;
    const tabData = profile.get('events');

    return (
      <div className="profile-content events">
        {tabData.map((data, index) => <div key={index} dangerouslySetInnerHTML={{ __html: data }}/>)}
      </div>
    );
  }

}

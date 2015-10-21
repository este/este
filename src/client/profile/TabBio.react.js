import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';

import fetch from '../../common/components/fetch';
import {loadProfile} from '../../common/profile/actions';

@fetch(loadProfile)
export default class TabBio extends Component {

  static propTypes = {
    profile: PropTypes.object.isRequired,
  }

  render() {

    const {profile} = this.props;
    const tabData = profile.get('bio');

    return (
      <div className="profile-content bio">
        {tabData.map((data, index) => <div dangerouslySetInnerHTML={{__html: data}} key={index}/>)}
      </div>
    );
  }

}

import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import fetch from '../../common/components/fetch';
import {loadProfile} from '../../common/profile/actions';

@fetch(loadProfile)
export default class TabPromoted extends Component {

  static propTypes = {
    profile: PropTypes.object.isRequired,
    tab: PropTypes.string.isRequired,
  }

  static defaultProps = {
    tab: 'promoted'
  }

  render() {

    const {profile} = this.props;
    const tabData = profile.get('promoted');

    return (
      <div className="profile-content promoted">
        {tabData.map((data, index) => <div key={index} dangerouslySetInnerHTML={{ __html: data }}/>)}
      </div>
    );
  }

}

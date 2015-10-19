
import './Page.scss';

import Component from 'react-pure-render/component';
import DocumentTitle from 'react-document-title';
import React, {PropTypes} from 'react';
import ReactDom from 'react-dom';
import {Link} from 'react-router';

import ProfileHeader from './ProfileHeader.react';
import ProfileBody from './ProfileBody.react';

export default class Page extends Component {

  static propTypes = {
  }

  render() {
    const {
      profile,
      users,
      } = this.props;
    const viewer = users.get('viewer') || {get: () => null};

    return (
      <DocumentTitle title={profile.get('name') + '\'s Profile'}>
        <div className="content-wrapper">
          <ProfileHeader profile={profile} viewer={viewer}/>
          <ProfileBody {...this.props}/>
        </div>
      </DocumentTitle>
    );
  }

}

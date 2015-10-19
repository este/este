import './Page.scss';
import Component from 'react-pure-render/component';
import DocumentTitle from 'react-document-title';
import React, {PropTypes} from 'react';
import ProfileBody from './ProfileBody.react';

export default class Page extends Component {

  static propTypes = {
    profile: PropTypes.object,
  }

  render() {
    const {
      profile,
      } = this.props;

    return (
      <DocumentTitle title={profile.get('name') + '\'s Profile'}>
        <div className="content-wrapper">
          <ProfileBody {...this.props}/>
        </div>
      </DocumentTitle>
    );
  }

}

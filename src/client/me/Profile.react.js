import Component from 'react-pure-render/component';
import DocumentTitle from 'react-document-title';
import React, {PropTypes} from 'react';

export default class Profile extends Component {

  static propTypes = {
    msg: PropTypes.object
  }

  render() {
    const {msg} = this.props;

    return (
      <DocumentTitle title={msg.profile.title}>
        <div className="profile-page">
          <p>
            {msg.profile.title}
          </p>
        </div>
      </DocumentTitle>
    );
  }

}

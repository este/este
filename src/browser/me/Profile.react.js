import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React, {PropTypes} from 'react';

export default class Profile extends Component {

  static propTypes = {
    msg: PropTypes.object
  };

  render() {
    const {msg} = this.props;

    return (
      <div className="profile-page">
        <Helmet title={msg.profile.title} />
        <p>
          {msg.profile.title}
        </p>
      </div>
    );
  }

}

import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';

export default class User extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired
  };

  render() {
    const {
      user: { displayName, profileImageURL }
    } = this.props;
    const title = displayName || 'Some user logged in via email';
    return (
      <li>
        <img
          alt={`${title} profile`}
          src={profileImageURL}
          title={title}
        />
      </li>
    );
  }

}

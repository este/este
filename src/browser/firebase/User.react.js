import Component from 'react-pure-render/component';
import Gravatar from 'react-gravatar';
import React, { PropTypes } from 'react';

export default class User extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired
  };

  render() {
    const { user } = this.props;
    const { displayName, email, photoURL } = user;
    return (
      <li>
        {photoURL ?
          <img
            role="presentation"
            src={photoURL}
            title={displayName}
          />
        :
          <Gravatar
            default="retro"
            email={email || displayName}
            rating="x"
            size={50}
            title={displayName}
          />
        }
      </li>
    );
  }

}

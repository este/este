import './OnlineUsers.scss';
import Component from 'react-pure-render/component';
import Gravatar from 'react-gravatar';
import React, { PropTypes } from 'react';
import { Loading } from '../app/components';
import { connect } from 'react-redux';
import { onUsersPresence } from '../../common/users/actions';
import { queryFirebase } from '../../common/lib/redux-firebase';

const User = ({ user: { displayName, photoURL } }) =>
  <div className="user">
    {photoURL ?
      <img
        role="presentation"
        src={photoURL}
        title={displayName}
      />
    :
      <Gravatar
        default="retro"
        email={displayName} // For users signed in via email.
        https
        rating="x"
        size={50}
        title={displayName}
      />
    }
  </div>;

User.propTypes = {
  user: PropTypes.object.isRequired,
};

class OnlineUsers extends Component {

  static propTypes = {
    users: PropTypes.object,
    loaded: PropTypes.bool.isRequired,
  };

  render() {
    const { users, loaded } = this.props;

    return (
      <div className="online-users">
        {!loaded ?
          <Loading />
        : !users ?
          <p>No one is online.</p>
        :
          users.reverse().map(user =>
            <User key={user.id} user={user} />
          )
        }
      </div>
    );
  }

}

OnlineUsers = queryFirebase(OnlineUsers, ({ onUsersPresence }) => ({
  path: 'users-presence',
  on: { value: onUsersPresence },
}));

export default connect(state => ({
  users: state.users.online,
  loaded: state.users.onlineLoaded,
}), { onUsersPresence })(OnlineUsers);

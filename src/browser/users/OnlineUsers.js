/* @flow */
import Gravatar from 'react-gravatar';
import React from 'react';
import { Image, Loading, Text, View } from '../app/components';
import { connect } from 'react-redux';
import { firebase } from '../../common/lib/redux-firebase';
import { onUsersPresence } from '../../common/users/actions';

const styles = {
  user: {
    display: 'inline-block',
  },
  gravatar: {
    borderRadius: '25%',
    margin: '.5em',
    maxHeight: 50,
  },
};

const User = ({ user }) => (
  <View style={styles.user}>
    {user.photoURL ?
      <Image
        role="presentation"
        src={user.photoURL}
        style={styles.gravatar}
        title={user.displayName}
      />
    :
      <Gravatar
        default="retro"
        email={user.displayName} // For users signed in via email.
        rating="x"
        style={styles.gravatar}
        title={user.displayName}
      />
    }
  </View>
);

User.propTypes = {
  user: React.PropTypes.object.isRequired,
};

let OnlineUsers = ({ loaded, users }) => (
  <View>
    {!loaded ?
      <Loading />
    : !users ?
      <Text>No one is online.</Text>
    :
      users.map(user =>
        <User key={user.id} user={user} />
      )
    }
  </View>
);

OnlineUsers.propTypes = {
  users: React.PropTypes.object,
  loaded: React.PropTypes.bool.isRequired,
};

OnlineUsers = firebase((database, props) => {
  const usersPresenceRef = database.child('users-presence');
  return [
    [usersPresenceRef, 'on', 'value', props.onUsersPresence],
  ];
})(OnlineUsers);

export default connect(state => ({
  users: state.users.online,
  loaded: state.users.onlineLoaded,
}), { onUsersPresence })(OnlineUsers);

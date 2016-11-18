/* @flow */
import type { State } from '../../common/types';
import Gravatar from 'react-gravatar';
import R from 'ramda';
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

const OnlineUsers = ({ users }) => (
  <View>
    { users === undefined ?
      <Loading />
    : users === null ?
      <Text>No one is online.</Text>
    :
      users.map(user =>
        <User key={user.id} user={user} />,
      )
    }
  </View>
);

OnlineUsers.propTypes = {
  users: React.PropTypes.array,
};

export default R.compose(
  connect(
    (state: State) => ({
      users: state.users.online,
    }),
    { onUsersPresence },
  ),
  firebase((database, props) => {
    const usersPresenceRef = database.child('users-presence');
    return [
      [usersPresenceRef, 'on', 'value', props.onUsersPresence],
    ];
  }),
)(OnlineUsers);

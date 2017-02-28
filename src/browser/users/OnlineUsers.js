// @flow
import type { State, User } from '../../common/types';
import React from 'react';
import getUserPhotoUrl from '../../common/users/getUserPhotoUrl';
import { Box, Image, Text } from '../../common/components';
import { connect } from 'react-redux';

type OnlineUserProps = {
  user: User,
};

const OnlineUser = ({ user }: OnlineUserProps) => (
  <Image
    marginHorizontal={0.25}
    size={{ height: 50, width: 50 }}
    src={getUserPhotoUrl(user)}
    title={user.displayName}
  />
);

type OnlineUsersProps = {
  users: ?Array<User>,
};

const OnlineUsers = ({ users }: OnlineUsersProps) => users == null
  ? <Text>No one is online.</Text>
  : <Box flexDirection="row" flexWrap="wrap" marginHorizontal={-0.25}>
      {users.map(user => <OnlineUser key={user.id} user={user} />)}
    </Box>;

export default connect((state: State) => ({
  users: state.users.online,
}))(OnlineUsers);

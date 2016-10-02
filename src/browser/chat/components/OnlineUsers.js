import React, {PropTypes} from 'react';
import {View, Text, Block} from '../../app/components';

const OnlineUsers = ({users}) => {

  return (
    <Block mt={1}>
      {
        users.size ?
          <View>
            <Text mx={2} small>
              <span>
                {users.size} user{users.size > 1 ? 's' : null} in room:
              </span>
              <i style={{ marginLeft: '5px' }}>
                {
                  users.map(user => user.displayName).toArray().join(', ')
                }
              </i>
            </Text>
          </View>
          :
          <Text small></Text>
      }
    </Block>
  );
};

OnlineUsers.propTypes = {
  users: PropTypes.object.isRequired,
};

export default OnlineUsers;

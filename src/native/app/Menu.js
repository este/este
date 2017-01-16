// @flow
import type { State, User } from '../../common/types';
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import { Box, Text } from '../../common/components';
import { FormattedMessage } from 'react-intl';
import { Link } from '../components';
import { ScrollView } from 'react-native';
import { appShowMenu } from '../../common/app/actions';
import { connect } from 'react-redux';

let MenuLink = ({ appShowMenu, message, ...props }) => (
  <Box
    // flexDirection="row"
    // justifyContent="center"
    marginVertical={0.25}
    paddingVertical={0.25}
    style={theme => ({ backgroundColor: theme.colors.open.gray8 })}
  >
    <FormattedMessage {...message}>
      {message => (
        <Link
          {...props}
          title={message}
          color="white"
          onPress={() => setTimeout(() => appShowMenu(false), 0)}
        />
      )}
    </FormattedMessage>
  </Box>
);

MenuLink = connect(
  null,
  { appShowMenu },
)(MenuLink);

type MenuProps = {
  viewer?: User,
};

const Menu = ({
  viewer,
}: MenuProps) => (
  <Box
    flex={1}
    paddingHorizontal={0.4}
    paddingVertical={1}
    style={theme => ({ backgroundColor: theme.colors.open.gray9 })}
  >
    <ScrollView automaticallyAdjustContentInsets={false}>
      <MenuLink exactly to="/" message={linksMessages.home} />
      <MenuLink to="/todos" message={linksMessages.todos} />
      <MenuLink to="/intl" message={linksMessages.intl} />
      <MenuLink to="/offline" message={linksMessages.offline} />
      {viewer ?
        <MenuLink to="/me" message={linksMessages.me} />
      :
        <MenuLink to="/signin" message={linksMessages.signIn} />
      }
    </ScrollView>
  </Box>
);

export default connect(
  (state: State) => ({
    viewer: state.users.viewer,
  }),
)(Menu);

// let MenuLink = ({ appShowMenu, message, ...props }) => (
//   <FormattedMessage {...message}>
//     {message =>
//       <Link
//         {...props}
//         activeStyle={styles.tabLinkActive}
//         onPress={() => setTimeout(() => appShowMenu(false), 0)}
//         style={styles.tabLink}
//       >{message}</Link>
//     }
//   </FormattedMessage>
// );

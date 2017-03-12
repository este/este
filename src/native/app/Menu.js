// @flow
import type { State, User } from '../../common/types';
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import { Box } from '../../common/components';
import { FormattedMessage } from 'react-intl';
import { Link } from '../components';
import { ScrollView } from 'react-native';
import { appShowMenu } from '../../common/app/actions';
import { connect } from 'react-redux';

let MenuLink = ({ appShowMenu, message, ...props }) => (
  <FormattedMessage {...message}>
    {message => (
      <Link
        {...props}
        onPress={() => setTimeout(() => appShowMenu(false), 0)}
        marginVertical={0.25}
        paddingVertical={0.25}
        paddingHorizontal={0.25}
        justifyContent="flex-start"
        activeStyle={theme => ({ backgroundColor: theme.colors.open.gray8 })}
        textStyle={theme => ({ color: theme.colors.open.gray2 })}
      >
        {message}
      </Link>
    )}
  </FormattedMessage>
);

MenuLink = connect(null, { appShowMenu })(MenuLink);

type MenuProps = {
  viewer?: User,
};

const Menu = (
  {
    viewer,
  }: MenuProps,
) => (
  <Box
    flex={1}
    paddingHorizontal={0.5}
    paddingVertical={1}
    style={theme => ({ backgroundColor: theme.colors.open.gray9 })}
  >
    <ScrollView automaticallyAdjustContentInsets={false}>
      <MenuLink exactly to="/" message={linksMessages.home} />
      <MenuLink to="/todos" message={linksMessages.todos} />
      <MenuLink to="/intl" message={linksMessages.intl} />
      <MenuLink to="/offline" message={linksMessages.offline} />
      {viewer
        ? <MenuLink to="/me" message={linksMessages.me} />
        : <MenuLink to="/signin" message={linksMessages.signIn} />}
    </ScrollView>
  </Box>
);

export default connect((state: State) => ({
  viewer: state.users.viewer,
}))(Menu);

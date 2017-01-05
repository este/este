// @flow
import type { State, User } from '../../common/types';
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import { Box, Link } from '../app/components';
import { FormattedMessage } from 'react-intl';
import { compose } from 'ramda';
import { connect } from 'react-redux';

const HeaderLink = ({ exactly, to, message }) => (
  <Link
    backgroundColor="primary"
    bold
    color="white"
    exactly={exactly}
    paddingHorizontal={0.5}
    paddingVertical={0.5}
    to={to}
  >
    <FormattedMessage {...message} />
  </Link>
);

type HeaderProps = {
  viewer: ?User,
};

const Header = ({
  viewer,
}: HeaderProps) => (
  <Box
    backgroundColor="primary"
    display="flex"
    flexWrap="wrap"
    marginVertical={0.5}
    paddingHorizontal={0.5}
  >
    <HeaderLink exactly to="/" message={linksMessages.home} />
    <HeaderLink to="/users" message={linksMessages.users} />
    <HeaderLink to="/todos" message={linksMessages.todos} />
    <HeaderLink to="/fields" message={linksMessages.fields} />
    <HeaderLink to="/intl" message={linksMessages.intl} />
    <HeaderLink to="/offline" message={linksMessages.offline} />
    <HeaderLink to="/me" message={linksMessages.me} />
    {!viewer &&
      <HeaderLink to="/signin" message={linksMessages.signIn} />
    }
  </Box>
);

export default compose(
  connect(
    (state: State) => ({
      viewer: state.users.viewer,
    }),
  ),
)(Header);

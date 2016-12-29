// @flow
import type { Intl, State, User } from '../../common/types';
import React from 'react';
import compose from 'ramda/src/compose';
import linksMessages from '../../common/app/linksMessages';
import { Box, Link } from '../app/components';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

const HeaderLink = ({ exactly, to, children }) => (
  <Link
    backgroundColor="primary"
    bold
    color="white"
    exactly={exactly}
    paddingHorizontal={0.5}
    paddingVertical={0.5}
    to={to}
  >{children}</Link>
);

type HeaderProps = {
  intl: Intl,
  viewer: ?User,
};

const Header = ({
  intl: { formatMessage },
  viewer,
}: HeaderProps) => (
  <Box
    backgroundColor="primary"
    display="flex"
    flexWrap="wrap"
    marginVertical={0.5}
    paddingHorizontal={0.5}
  >
    <HeaderLink exactly to="/">{formatMessage(linksMessages.home)}</HeaderLink>
    <HeaderLink to="/users">{formatMessage(linksMessages.users)}</HeaderLink>
    <HeaderLink to="/todos">{formatMessage(linksMessages.todos)}</HeaderLink>
    <HeaderLink to="/fields">{formatMessage(linksMessages.fields)}</HeaderLink>
    <HeaderLink to="/intl">{formatMessage(linksMessages.intl)}</HeaderLink>
    <HeaderLink to="/offline">{formatMessage(linksMessages.offline)}</HeaderLink>
    <HeaderLink to="/me">{formatMessage(linksMessages.me)}</HeaderLink>
    {!viewer &&
      <HeaderLink to="/signin">{formatMessage(linksMessages.signIn)}</HeaderLink>
    }
  </Box>
);

export default compose(
  connect(
    (state: State) => ({
      viewer: state.users.viewer,
    }),
  ),
  injectIntl,
)(Header);

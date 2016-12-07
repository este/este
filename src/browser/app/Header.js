/* @flow */
import type { State, User } from '../../common/types';
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import { FormattedMessage } from 'react-intl';
import { Box, Link, styled } from '../app/components';
import { connect } from 'react-redux';

const Style = styled((props, theme) => ({
  alignItems: 'center',
  backgroundColor: theme.colors.primary,
  display: 'flex',
  flexWrap: 'wrap',
  marginTop: theme.sizes.medium,
  paddingBottom: theme.sizes.medium,
  paddingLeft: theme.sizes.small,
  paddingRight: theme.sizes.small,
  paddingTop: theme.sizes.medium,
}));

type HeaderLinkProps = {
  exactly?: boolean,
  to: string,
  message: Object,
};

const HeaderLink = ({ exactly, to, message }: HeaderLinkProps) => (
  <Box marginHorizontal="small">
    <Link bold color="white" exactly={exactly} to={to}>
      <FormattedMessage {...message} />
    </Link>
  </Box>
);

type HeaderProps = {
  viewer: ?User,
};

const Header = ({ viewer }: HeaderProps) => (
  <Style>
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
  </Style>
);

export default connect(
  (state: State) => ({
    viewer: state.users.viewer,
  }),
)(Header);

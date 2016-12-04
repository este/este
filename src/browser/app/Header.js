/* @flow */
import type { State, User } from '../../common/types';
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import { FormattedMessage } from 'react-intl';
import { Link, Toolbar } from '../app/components';
import { connect } from 'react-redux';

type HeaderLinkProps = {
  exactly?: boolean,
  to: string,
  message: Object,
};

const HeaderLink = ({ exactly, to, message }: HeaderLinkProps) => (
  <Link bold color="white" exactly={exactly} to={to}>
    <FormattedMessage {...message} />
  </Link>
);

type HeaderProps = {
  viewer: ?User,
};

const Header = ({ viewer }: HeaderProps) => (
  <Toolbar>
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
  </Toolbar>
);

export default connect(
  (state: State) => ({
    viewer: state.users.viewer,
  }),
)(Header);

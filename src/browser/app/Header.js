// @flow
import type { State, User } from '../../common/types';
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import { Box } from '../../common/components';
import { FormattedMessage } from 'react-intl';
import { Link } from '../components';
import { compose } from 'ramda';
import { connect } from 'react-redux';

const HeaderLink = ({ activeOnlyWhenExact, to, message }) => (
  <Link
    activeOnlyWhenExact={activeOnlyWhenExact}
    backgroundColor="primary"
    bold
    color="white"
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
    flexWrap="wrap"
    flexDirection="row"
    marginVertical={0.5}
    paddingHorizontal={0.5}
  >
    <HeaderLink activeOnlyWhenExact to="/" message={linksMessages.home} />
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

// @flow
import type { State, User } from '../../common/types';
import React from 'react';
import SignOut from '../auth/SignOut';
import getUserPhotoUrl from '../../common/users/getUserPhotoUrl';
import linksMessages from '../../common/app/linksMessages';
import { FormattedMessage } from 'react-intl';
import { Match, Redirect } from 'react-router';
import { connect } from 'react-redux';
import {
  Box,
  Image,
  Link,
  Text,
  Title,
} from '../app/components';

// Pages
import Profile from './ProfilePage';
import Settings from './SettingsPage';

const Header = ({ pathname }) => (
  <Box
    marginBottom={1}
    marginHorizontal={-0.5}
  >
    <Link exactly to={pathname} paddingHorizontal={0.5}>
      <FormattedMessage {...linksMessages.me} />
    </Link>
    <Link to={`${pathname}/profile`} paddingHorizontal={0.5}>
      <FormattedMessage {...linksMessages.profile} />
    </Link>
    <Link to={`${pathname}/settings`} paddingHorizontal={0.5}>
      <FormattedMessage {...linksMessages.settings} />
    </Link>
  </Box>
);

type MePageProps = {
  pathname: string,
  viewer: User,
};

const MePage = ({ pathname, viewer }: MePageProps) => (
  !viewer ?
    <Redirect to="/" />
  :
    <Box>
      <Title message={linksMessages.me} />
      <Header pathname={pathname} />
      <Match
        exactly
        pattern={pathname}
        render={() => (
          <Box>
            <Text>{viewer.displayName}</Text>
            <Box marginVertical={1}>
              <Image
                src={getUserPhotoUrl(viewer)}
                height={100}
                width={100}
                title={viewer.displayName}
              />
            </Box>
            <SignOut />
          </Box>
        )}
      />
      <Match pattern={`${pathname}/profile`} component={Profile} />
      <Match pattern={`${pathname}/settings`} component={Settings} />
    </Box>
);

export default connect(
  (state: State) => ({
    viewer: state.users.viewer,
  }),
)(MePage);

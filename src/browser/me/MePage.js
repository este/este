// @flow
import type { State, User } from '../../common/types';
import React from 'react';
import SignOut from '../auth/SignOut';
import getUserPhotoUrl from '../../common/users/getUserPhotoUrl';
import linksMessages from '../../common/app/linksMessages';
import { Box, Image, Text } from '../../common/components';
import { FormattedMessage } from 'react-intl';
import { Link, Title } from '../components';
import { Match, Redirect } from 'react-router';
import { connect } from 'react-redux';

// Pages
import Profile from './ProfilePage';
import Settings from './SettingsPage';

const HeaderLink = ({ message, ...props }) => (
  <FormattedMessage {...message}>
    {message => (
      <Link paddingHorizontal={0.5} {...props}>
        {message}
      </Link>
    )}
  </FormattedMessage>
);

const Header = ({ pathname }) => (
  <Box flexDirection="row" marginBottom={1} marginHorizontal={-0.5}>
    <HeaderLink activeOnlyWhenExact to={pathname} message={linksMessages.me} />
    <HeaderLink to={`${pathname}/profile`} message={linksMessages.profile} />
    <HeaderLink to={`${pathname}/settings`} message={linksMessages.settings} />
  </Box>
);

type MePageProps = { pathname: string, viewer: User };

const MePage = ({ pathname, viewer }: MePageProps) => !viewer
  ? <Redirect to="/" />
  : <Box>
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
                size={{ height: 100, width: 100 }}
                title={viewer.displayName}
              />
            </Box>
            <Box flexDirection="row">
              <SignOut />
            </Box>
          </Box>
        )}
      />
      <Match pattern={`${pathname}/profile`} component={Profile} />
      <Match pattern={`${pathname}/settings`} component={Settings} />
    </Box>;

export default connect((state: State) => ({ viewer: state.users.viewer }))(
  MePage,
);

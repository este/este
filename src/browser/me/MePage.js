/* @flow */
import type { State } from '../../common/types';
import Gravatar from 'react-gravatar';
import React from 'react';
import SignOut from '../auth/SignOut';
import linksMessages from '../../common/app/linksMessages';
import { Block, Image, Link, Space, Text, Title, View } from '../app/components';
import { FormattedMessage } from 'react-intl';
import { Match, Redirect } from 'react-router';
import { connect } from 'react-redux';

// Pages
import Profile from './ProfilePage';
import Settings from './SettingsPage';

const Navbar = ({ pathname }) => (
  <Block>
    <Link exactly to={pathname}>
      <FormattedMessage {...linksMessages.me} />
    </Link>
    <Space x={2} />
    <Link to={`${pathname}/profile`}>
      <FormattedMessage {...linksMessages.profile} />
    </Link>
    <Space x={2} />
    <Link to={`${pathname}/settings`}>
      <FormattedMessage {...linksMessages.settings} />
    </Link>
  </Block>
);

Navbar.propTypes = {
  pathname: React.PropTypes.string.isRequired,
};

const MePage = ({ pathname, viewer }) => (
  !viewer ?
    <Redirect to="/" />
  :
    <View>
      <Title message={linksMessages.me} />
      <Navbar pathname={pathname} />
      <Match
        exactly
        pattern={pathname}
        render={() => (
          <View>
            <Text>{viewer.displayName}</Text>
            <Block>
              {viewer.photoURL ?
                <Image role="presentation" src={viewer.photoURL} />
              :
                <Gravatar
                  default="retro"
                  email={viewer.email}
                  rating="x"
                  size={100}
                />
              }
            </Block>
            <SignOut />
          </View>
        )}
      />
      <Match pattern={`${pathname}/profile`} component={Profile} />
      <Match pattern={`${pathname}/settings`} component={Settings} />
    </View>
);

MePage.propTypes = {
  pathname: React.PropTypes.string.isRequired,
  viewer: React.PropTypes.object,
};

export default connect(
  (state: State) => ({
    viewer: state.users.viewer,
  }),
)(MePage);

/* @flow */
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

const Navbar = () => (
  <Block>
    <Link exactly to="/me">
      <FormattedMessage {...linksMessages.me} />
    </Link>
    <Space x={2} />
    <Link to="/me/profile">
      <FormattedMessage {...linksMessages.profile} />
    </Link>
    <Space x={2} />
    <Link to="/me/settings">
      <FormattedMessage {...linksMessages.settings} />
    </Link>
  </Block>
);

const MePage = ({ viewer }) => (
  !viewer ?
    <Redirect to={{ pathname: '/' }} />
  :
    <View>
      <Title message={linksMessages.me} />
      <Navbar />
      <Match
        exactly
        pattern="/me"
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
                  https
                  rating="x"
                  size={100}
                />
              }
            </Block>
            <SignOut />
          </View>
        )}
      />
      <Match pattern="/me/profile" component={Profile} />
      <Match pattern="/me/settings" component={Settings} />
    </View>
);

MePage.propTypes = {
  viewer: React.PropTypes.object,
};

export default connect(state => ({
  viewer: state.users.viewer,
}))(MePage);
